from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import spacy
import pickle

# Model 1: Hugging Face Summarizer
def save_model_1():
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn", use_fast=False)
    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn", use_fast=False)
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")
    with open("model1.pkl", "wb") as file:
        pickle.dump({"tokenizer": tokenizer, "model": model}, file)
    print("Model 1 saved successfully!")

# Model 2: QA Model and Summarizer
def save_model_2():
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn", use_fast=False)
    qa_model = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
    spacy_model = spacy.load("en_core_web_sm")
    with open("model2.pkl", "wb") as file:
        pickle.dump({"summarizer": summarizer, "qa_model": qa_model, "spacy_model": spacy_model}, file)
    print("Model 2 saved successfully!")

# Model 3: Flan-T5 for Summarization
def save_model_3():
    model_name = "google/flan-t5-large"
    tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    with open("model3.pkl", "wb") as file:
        pickle.dump({"tokenizer": tokenizer, "model": model}, file)
    print("Model 3 saved successfully!")

# Save all models
# save_model_1()
# save_model_2()
# save_model_3()
