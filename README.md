# Social-media-Analytics
Team Error404

# *Social Media Performance Analysis*  

This project is a part of the *Level Supermind Hackathon* Pre-Hackathon Assignment. It involves building a basic analytics module using *Langflow, **DataStax Astra DB, and **GPT* to analyze mock social media engagement data.  

## *Features*  

- *Data Storage: Simulated social media engagement data stored in **DataStax Astra DB*.  
- *Analytics Workflow: Built using **Langflow*, allowing seamless querying of the database based on post types (e.g., reels, carousel, static images).  
- *Insights Generation: Leverages **GPT integration* in Langflow to provide actionable insights into post performance metrics like likes, shares, and comments.  

---

## *Workflow Overview*  

1. *Input*: Accepts post type as input (e.g., reels, carousel).  
2. *Query*: Queries Astra DB for relevant data and calculates average engagement metrics.  
3. *Insights*: Uses GPT to generate simple, actionable insights based on the data.  

---

## *Tech Stack*  

- *Langflow*: For building the analytics workflow and GPT integration.  
- *DataStax Astra DB*: For storing and querying engagement data.  
- *Python*: For script automation and integration.  

---

## *Setup Instructions*  

1. *Clone the Repository*  
   bash  
   git clone https://github.com/AryanTheng/Social-media-Analytics.git  
   cd Social-Media-Performance-Analysis  
     

2. *Set Up DataStax Astra DB*  
   - Sign up at [DataStax Astra](https://www.datastax.com/astra).  
   - Create a new database and import the provided dataset into your table.  

3. *Install Dependencies*  
   - Install Langflow and other required packages:  
     bash  
     pip install -r requirements.txt  
       

4. *Run Langflow*  
   bash  
   langflow  
     
   - Open the Langflow UI and upload the workflow JSON file provided in this repository.  

5. *Test the Workflow*  
   - Enter a post type (e.g., reels) and analyze the insights generated.  

---

## *Demo Video*  

https://youtu.be/mHWxt6RbcQo?si=PRWQSBM7vS_TN0_4

---

## *Insights Examples*  

- *Carousel Posts*: Achieve 20% higher engagement compared to static posts.  
- *Reels*: Generate 2x more comments than other formats.  

---

## *License*  

This project is licensed under the MIT License. See the LICENSE file for details.  

---  

## *Contact*  

For any queries or issues, please feel free to reach out:  
- *Email*: aryantheng5@gmail.com  
- *GitHub*: [AryanTheng](https://github.com/AryanTheng)  

---  
