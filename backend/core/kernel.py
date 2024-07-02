import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

# Initialize MTCNN for face detection and InceptionResnet for face embedding
mtcnn = MTCNN()
resnet = InceptionResnetV1(pretrained='vggface2').eval()


def extract_face_embeddings(image):
    if image is None:
        return None

    try:
        # Convert the image to RGB (facenet_pytorch uses RGB images)
        image_rgb = image.convert('RGB')  # Use PIL's convert method to ensure it's RGB
        image_np = np.array(image_rgb)  # Convert PIL image to NumPy array

        # Detect faces in the image
        faces = mtcnn(image_np)

        if faces is None:
            return None

        # Add a batch dimension to the detected face
        faces = faces.unsqueeze(0)

        # Extract face embeddings
        embeddings = resnet(faces)

        return embeddings.detach().numpy()
    except Exception as e:
        print(f"Error processing image: {e}")
        return None


def compare_face(input_embeddings, database_image_path):
    image = Image.open(database_image_path)
    database_embeddings = extract_face_embeddings(image)

    if database_embeddings is None:
        return None, 0

    # Reshape the embeddings to remove the batch dimension
    input_embeddings = input_embeddings.squeeze(0)
    database_embeddings = database_embeddings.squeeze(0)

    # Compute cosine similarity between the input embeddings and the database embeddings
    similarity = cosine_similarity([input_embeddings], [database_embeddings])[0][0]

    return os.path.basename(database_image_path), similarity * 100  # Convert similarity to percentage


def main(input_image, database_dir):
    # Convert InMemoryUploadedFile to PIL Image if necessary
    if isinstance(input_image, InMemoryUploadedFile):
        image_bytes = BytesIO(input_image.read())
        input_image = Image.open(image_bytes)

    # Extract embeddings for the input image
    input_embeddings = extract_face_embeddings(input_image)
    if input_embeddings is None:
        print("No face detected in the input image.")
        return None, 0

    # Initialize variables to track the highest similarity and corresponding image name
    best_similarity = 0
    best_image_name = None

    # Compare the input embeddings with each face in the database directory
    for filename in os.listdir(database_dir):
        image_path = os.path.join(database_dir, filename)
        name, similarity = compare_face(input_embeddings, image_path)
        if similarity > best_similarity:
            best_similarity = similarity
            best_image_name = name

    return best_image_name, best_similarity
