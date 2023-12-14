# [Live Website](https://frontend-sih.onrender.com)

## Features

#### 1. User Register and Login, the encrypted password is stored in the database.

![register](https://user-images.githubusercontent.com/76938125/230215064-bc23d6ca-c2c3-46cf-b94d-b11d3fe698f8.png)

![login](https://user-images.githubusercontent.com/76938125/230215069-10bb8c30-45fa-470b-aea5-5425b0541eac.png)

#### 2. User can enter the skills they have acquired, they can update as and when they like. Their userId is uniquely stored in MongoDB which fetches their details.

![ski](https://user-images.githubusercontent.com/76938125/230208550-a2e26ec0-5d4b-4ff6-bd9a-94ee4fd88f10.png)

#### 3. Using a custom algorithm which searches for the required job titles in multiple domains from a huge dataset, we recommend them jobs based on the location entered.

![1](https://user-images.githubusercontent.com/76938125/230208521-51f1ecc6-ab64-41af-a5e3-9beea9c44282.png)

#### 4. User can edit their profile with the following form and can upload their image as well.

![edit](https://user-images.githubusercontent.com/76938125/230210265-95ccf164-8ba3-416a-a7ff-c42cec7f821d.png)

- The below form is taken as input from the user asking about their job details, current and previous jobs.

![3](https://user-images.githubusercontent.com/76938125/230208527-e448e01e-8bf6-40b4-b817-e374e6e75f43.png)

#### 5. This form is for the job satisfaction index of the user.

![4](https://user-images.githubusercontent.com/76938125/230208529-fdbbc350-bb27-448f-8119-5f76ca67e91e.png)

#### 6. The data collected from the forms is used to plot a graph which compares their previous jobs to the current one and in process gets them a salary satisfaction index as well which is calculated through our algorithm.

![5](https://user-images.githubusercontent.com/76938125/230208536-5a45a904-bd5f-4721-90d6-9a95e4ea14d1.png)

#### 7. Besides this our website is friendly for people who aren't really verse with technical skills. This feature allows the user to search the jobs via images.

![6](https://user-images.githubusercontent.com/76938125/230208542-6c124fb5-fe4f-436d-8cb0-ac2e3637ebc3.png)
![7](https://user-images.githubusercontent.com/76938125/230208548-91b551fa-bffc-4904-b752-30e03f9f8fec.png)

# How to Run

1. Clone the Repository in your Code Runner.
2. Open two terminals one for Backend and one for Frontend.
3. Run the command - change to directory from SIH-Project to FrontEnd and BackEnd in their respective terminals using the command
   :- cd FrontEnd
   :- cd BackEnd
4. Run the command :- npm i for both the terminals.
5. Then run the command :- npm run start for FrontEnd &
   :- nodemon server for BackEnd

If You are Mac useror windows is giving error just make the following change in the package.json file before running the above command
:- "start": "set PORT=3006 && react-scripts --openssl-legacy-provider start" in the package.json file.


Explore our website and find yourselves a suitable job based on your skills.
