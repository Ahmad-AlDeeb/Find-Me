import os
import numpy as np
from deepface import DeepFace
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

from sklearn.metrics.pairwise import cosine_similarity


def extract_face_embeddings_deepface(image):
    try:
        # Convert the image to RGB
        image_rgb = image.convert('RGB')
        embeddings = DeepFace.represent(img_path=np.array(image_rgb), model_name='Facenet', enforce_detection=False)

        if len(embeddings) == 0:
            return None

        # Extract the embedding vector
        embedding = embeddings[0]["embedding"]
        return np.array(embedding)
    except Exception as e:
        print(f"Error processing image: {e}")
        return None


def compare_face_deepface(input_embeddings, database_image_path):
    image = Image.open(database_image_path)
    database_embeddings = extract_face_embeddings_deepface(image)

    if database_embeddings is None:
        return None, 0

    # Compute cosine similarity between the input embeddings and the database embeddings
    similarity = cosine_similarity([input_embeddings], [database_embeddings])[0][0]

    return os.path.basename(database_image_path), similarity * 100  # Convert similarity to percentage


def main(input_image, database_dir):
    # Convert InMemoryUploadedFile to PIL Image if necessary
    if isinstance(input_image, InMemoryUploadedFile):
        image_bytes = BytesIO(input_image.read())
        input_image = Image.open(image_bytes)

    # Extract embeddings for the input image
    input_embeddings = extract_face_embeddings_deepface(input_image)
    if input_embeddings is None:
        print("No face detected in the input image.")
        return None, 0

    # Initialize variables to track the highest similarity and corresponding image name
    best_similarity = 0
    best_image_name = None

    # Compare the input embeddings with each face in the database directory
    for filename in os.listdir(database_dir):
        image_path = os.path.join(database_dir, filename)
        name, similarity = compare_face_deepface(input_embeddings, image_path)
        if similarity > best_similarity:
            best_similarity = similarity
            best_image_name = name

    return best_image_name, best_similarity
