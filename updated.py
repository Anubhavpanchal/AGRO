import streamlit as st
import tensorflow as tf
import numpy as np
import gdown


# Specify the file ID and the output file name
file_id = '1BKDkJd0sJixEt0c72822_XdAMS3gUYEa'
output_file = 'trained_plant_disease_model.keras'

# Download the file from Google Drive
gdown.download(f'https://drive.google.com/uc?id=1BKDkJd0sJixEt0c72822_XdAMS3gUYEa', output_file, quiet=False)




# Tensorflow Model Prediction
def model_prediction(test_image):
    model = tf.keras.models.load_model(output_file)
    image = tf.keras.preprocessing.image.load_img(test_image, target_size=(128,128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to batch
    predictions = model.predict(input_arr)
    return np.argmax(predictions)  # Return index of max element

# Disease Recognition Page
st.header("Disease Recognition")
test_image = st.file_uploader("Choose an Image:")
if st.button("Show Image"):
    st.image(test_image, use_column_width=True)
# Predict button
if st.button("Predict"):
    st.snow()
    st.write("Our Prediction")
    result_index = model_prediction(test_image)
    # Reading Labels
    class_name = ['Apple__Apple_scab', 'Apple_Black_rot', 'Apple_Cedar_apple_rust', 'Apple__healthy',
                  'Blueberry__healthy', 'Cherry(including_sour)___Powdery_mildew',
                  'Cherry_(including_sour)__healthy', 'Corn(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                  'Corn_(maize)__Common_rust', 'Corn_(maize)__Northern_Leaf_Blight', 'Corn(maize)___healthy',
                  'Grape__Black_rot', 'Grape_Esca(Black_Measles)', 'Grape__Leaf_blight(Isariopsis_Leaf_Spot)',
                  'Grape__healthy', 'Orange_Haunglongbing(Citrus_greening)', 'Peach___Bacterial_spot',
                  'Peach__healthy', 'Pepper,_bell_Bacterial_spot', 'Pepper,_bell__healthy',
                  'Potato__Early_blight', 'Potato_Late_blight', 'Potato__healthy',
                  'Raspberry__healthy', 'Soybean_healthy', 'Squash__Powdery_mildew',
                  'Strawberry__Leaf_scorch', 'Strawberry_healthy', 'Tomato__Bacterial_spot',
                  'Tomato__Early_blight', 'Tomato_Late_blight', 'Tomato__Leaf_Mold',
                  'Tomato__Septoria_leaf_spot', 'Tomato__Spider_mites Two-spotted_spider_mite',
                  'Tomato__Target_Spot', 'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato__Tomato_mosaic_virus',
                  'Tomato___healthy']
    st.success("Model is Predicting it's a {}".format(class_name[result_index]))
