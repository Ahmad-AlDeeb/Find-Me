import os
import cv2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image

# Initialize MTCNN for face detection and InceptionResnet for face embedding
mtcnn = MTCNN()
resnet = InceptionResnetV1(pretrained='vggface2').eval()


def extract_face_embeddings(image):
    # Convert the image to RGB (facenet_pytorch uses RGB images)
    image_rgb = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

    # Detect faces in the image
    faces = mtcnn(image_rgb, save_path=None)  # Remove the unpacking

    if faces is None:
        return None

    # Add a batch dimension to the detected face
    faces = faces.unsqueeze(0)

    # Extract face embeddings
    embeddings = resnet(faces)

    return embeddings.detach().numpy()


def compare_faces(input_embeddings, database_embeddings):
    similarities = {}

    # Reshape the input embeddings to remove the batch dimension
    input_embeddings = input_embeddings.squeeze(0)

    for filename, embeddings in database_embeddings.items():
        # Reshape the database embeddings to remove the batch dimension
        embeddings = embeddings.squeeze(0)

        # Compute cosine similarity between the input embeddings and each face embeddings in the database
        similarity = cosine_similarity([input_embeddings], [embeddings])[0][0]

        # Store the similarity score in the dictionary
        similarities[filename] = similarity

    return similarities


def main(input_image, database_dir):
    # Extract embeddings for the input image
    input_embeddings = extract_face_embeddings(input_image)

    if input_embeddings is None:
        print("No face detected in the input image.")
        return

    # Load and extract embeddings for faces from the database directory
    database_embeddings = {}
    for filename in os.listdir(database_dir):
        image_path = os.path.join(database_dir, filename)
        image = Image.open(image_path)
        embeddings = extract_face_embeddings(image)
        if embeddings is not None:
            database_embeddings[filename] = embeddings

    if not database_embeddings:
        print("No faces detected in the database directory.")
        return

    # Compare the input embeddings with embeddings in the database
    similarities = compare_faces(input_embeddings, database_embeddings)

    # Sort the dictionary by similarity score
    sorted_similarities = {k: v for k, v in sorted(similarities.items(), key=lambda item: item[1], reverse=True)}

    return sorted_similarities

