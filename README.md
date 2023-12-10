Distinctiveness and Complexity:
Throughout the course, we worked on various projects, including a wiki, a social network, and more. As I began the final lecture and reviewed the ultimate project, I spent a week contemplating its direction. During this reflection, I realized I frequently forgot my pets' last medical appointments and vaccination dates.

This realization led to the creation of PetTrack—an application designed to manage pets' medical schedules, track vaccinations, monitor weight, and handle other related tasks. I'm immensely satisfied with the outcome as it represents a comprehensive project where I extensively utilized Python and JavaScript.

Unlike other projects in the course focused on e-commerce or social networks, PetTrack serves as an information management application. A notable aspect is the additional layer of security I implemented against bots, employing email confirmation, which I'll detail further. This project allowed me to deepen my understanding of JavaScript, enhancing the user experience by leveraging two JavaScript libraries, thereby improving the project's aesthetics. Additionally, I utilized Django for image storage and file management.

Initially, during the coding phase, I observed a lackluster interaction when submitting forms in Django. To address this, I utilized Bootstrap to create modals, facilitating user registration for pets and related information. Subsequently, JavaScript processed this data and sent it to a Django view, ensuring a smoother user experience through this API workflow.

Throughout the application, JavaScript was instrumental in form validation, enhancing security measures. By project completion, I created 6 models in Django and incorporated 7 JavaScript files.

Another project requirement was ensuring responsiveness for mobile users. This posed a challenge initially, but Bootstrap proved invaluable, providing containers and tools that simplified the application's responsiveness. I maintained consistency by using two responsive layouts: one called "admi Layout" for registered user pages and another named "Layout" for unregistered user pages.

As mentioned earlier, one of the primary distinctions of this project from others in the course is its anti-bot system. Its functionality is straightforward: upon user registration, a 16-alphanumeric code is generated and saved in the User model, accompanied by a Boolean field indicating verification status. An email containing a link with the code is dispatched, and upon user verification via the link, the Boolean field switches to "True," and the code is erased. Unverified users are unable to log in. Additionally, this system includes a password reset feature, where users can change their passwords via an emailed link after providing their account email.
Initially, for testing purposes, I used Mailtrap, but in the final application, I switched to Gmail's SMTP.

Regarding new features, users can now upload images for their pets. While implementing this feature was relatively straightforward, it required logical handling as users have the capability to edit or delete their pets, necessitating image deletion or replacement.

Another notable addition is the integration of two JavaScript libraries: SweetAlert and Chart.js. SweetAlert significantly contributed to aesthetically pleasing alerts used extensively throughout the project, such as when creating a pet or a vaccine, or when confirming deletion. Chart.js proved intriguing, enabling the creation of visually appealing graphs, particularly utilized in the weight control section.

On the main page of the authentication section, the user has a menu displaying the pets they own. Clicking on a pet redirects to a page presenting a menu with 5 options:
-Medical History: Here, the user can add past medical appointments for the pet, as well as edit and delete these appointments.
-Vaccinations: This section allows the addition of vaccines for the pet, comprising two fields: date of administration and expiration. -Additionally, there's a selection filter displaying expired vaccines.
-Medications: Similar to the medical history section but for the pet's medications.
-Weight Control: Users can input the pet's weight, and a graph will display its weight history.
-Pet Information: This page showcases a card containing all the pet's information and a button allowing the user to print a PDF.


PROJECT FILES:
At the root of the project, I have three directories: main, media, and PetTrack. PetTrack is the primary directory containing settings, while main is the application housing all files and templates. Media stores the images uploaded by users.
Within the main directory, there's a static folder containing a JavaScript folder and a CSS file. The JavaScript folder contains these files:
-history.js: Essentially, this JavaScript file detects when the button to add a medical appointment is pressed, verifies if all inputs are filled, sends the information via fetch to Django, and returns a response. It also manages the editing and deletion of appointments.
-medicines.js: Similar to history.js but for the section concerning adding, editing, and deleting medicines.
-pet.js: This file handles the creation, editing, and deletion of a pet.
-petInfo.js: Here, I've utilized a JavaScript library named html2pdf, enabling the selection of an element from HTML and printing it in PDF format. This is used on the petInfo page where users view a card containing pet information.
-vacc.js: Similar to other files, this one interacts with the Vaccines model.
-verification.js: This file is used in the form where a user creates an account, verifying if the fields are correctly filled.
-weight.js: Comparable to vacc.js, but it interacts with the Weight model, also retrieving pet records and displaying a graph using graph.js.

Moving on to the Templates folder, I have two files and two folders:
-adminLayout.html: This layout is utilized in all files within the auth folder.
-layout.html: Similarly, this layout is used in all files within the login folder.

  Auth folder:
-appo.html: This is the view where the user can see the details of a single appointment.
-history.html: Here, the user views all appointments associated with the pet.
-home.html: The primary menu displaying all the user's pets.
-medications.html: The view where the user can edit, add, or delete the pet's medications.
-pet.html: The pet's menu displaying the 5 options.
-petInfo.html: A card containing the pet's information.
-profile.html: Displays user information and two links—one for logging out and another to change the password.
-vaccines.html: Displays all the vaccines associated with the pet.
-weightControl.html: Presents a table with all weight records and a corresponding graph.

 Login folder:
-changePassword.html: This view enables users to change their passwords.
-confirm.html: A message shown when the user is verified.
-email.html: A notification stating that an email has been sent.
-forgot.html: This contains an email field where an email is sent with a link to a password change page.
-index.html: The main page for user login.
-register.html: The page where users can create accounts.

Running the Application:

1. Install required packages: pip install -r requirements.txt
2. Apply migrations: python manage.py migrate
3. Run the server: python manage.py runserver

