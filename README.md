Amin Joseph
ID: 20607973
							-------------
							|USF Secrets|
							------------- 


			In this project, I have created a website that allows USF students to post anonymously. 
			This is intended to be a forum where users can create an account, using a generic username 
			similar to Reddit's structure, and start posting their opinions or thoughts. True voices or 
			opinions on various matters, whether they stem from USF, the community, or the nation, 
			are posted by current USF students. User authentication is checked through the student 
			email. This platform provides a safe space intended to foster genuine conversation that 
			is respectful and cordial among our peers. Here, users can view, create, and delete their own posts.

			This project employs technologies such as the Express framework, jQuery, CSS, Handlebars, 
			Bootstrap, MongoDB, and JavaScript. The pages are based on a main layout that utilizes partials 
			to create a consistent look across each page. One of the difficulties I encountered was 
			trying to connect all the logic from the backend to the frontend, while also sending vital 
			information to the MongoDB database. Synchronizing these elements posed a significant 
			challenge, but through organized routes and the use of middleware, I was able to pull all the logic together.

			Also I use a news a api and weather api to retrieve data for the user that might be useful. The news api
			is utilized to receive popular headlines to be displayed in the home page, while the weather api is used
			to retrieve weather of the specific location the user is in, which is displayed in the footer of all the 
			pages. Geolocation is implemented to receive the user's location. Lastly, I only get 100 requests
			For the news api so, no news has loaded that means it has gone through the 100 free requests.

			I used several resources to help build this website. Vital resources 
			included Geeks for Geeks and StackOverflow. These resources significantly 
			aided in development and helped simplify several concepts that I initially found challenging.

			All in all, this has been a very enjoyable and rewarding experience. 
			I hope this website will be utilized by students who want to engage 
			in meaningful conversation without fear of voicing their true opinions. 
			Together, we can create a meaningful forum where genuine conversations are held.
