import streamlit as st
import requests

st.title("PDF Summary Generator")

uploaded_files = st.file_uploader("Upload one or more PDFs", type="pdf", accept_multiple_files=True)

if uploaded_files:
    summaries = []
    for uploaded_file in uploaded_files:
        files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "application/pdf")}
        response = requests.post("http://localhost:8000/api/getPdfSummary", files=files)
        if response.status_code == 200:
            summary = response.json().get("result")
            summaries.append(summary)
        else:
            st.error(f"Error processing {uploaded_file.name}: {response.text}")

    for i, summary in enumerate(summaries):
        st.subheader(f"Summary for {uploaded_files[i].name}")
        st.write(summary)
