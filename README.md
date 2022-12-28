# Blogging application - ECE Webtech project

Geekit is a minimalist and simple blog. Visit the blog, create an account with your email and password or with Github. Once logged in, you can view the posted articles, like them, save them, and comment on them. If you have an idea for an article, press the + button and create your own. In your profile, you can find the articles you have created and other features!

## Production 

- Vercel URL: https://ece-webapp-pierre-louis-kilan.vercel.app
- Supabase project URL: https://app.supabase.com/project/daanvkdbopwfvbubxcgk

## Usage

- Clone this repository, from your local machine:

```
git clone git@github.com:random-long-int/ece-webapp-PierreLouis-Kilan.git webapp-kilan-pl
```

- Supabase Link

```bash
cp .env.local.example .env.local
```

- Start the the application

```bash
cd webapp-kilan-pl
# Install dependencies (use yarn or npm)
npm install
npm run build
npm start
```

## Authors

- Pierre-Louis Létoquart | pierrelouislet@gmail.com

- Kilan Kardous | kylan.kardous@gmail.com

## Tasks

**Project management:**

- Naming convention   

    The naming convention for this project follows camel case for variables and simple, clear names for files and directories.

- Project structure   

    The project is structured using Next.js with TypeScript, with the blog content and design focused on simplicity and clean aesthetics.

- Git   

    The project uses Git for version control, with branches for new features and bug fixes named "feature/" and "fix/", and clear, well-formatted commit messages.

- Code quality   

    The code in this project follows best practices for readability and maintainability, with an emphasis on clean, well-organized code.

- Design, UX, and content   

    The design of the project is simple and minimalist, with a focus on providing a seamless and intuitive user experience. The content is well-written and easy to read, with a clear focus on the subject matter of the blog.

**Application development:**

- Home page

    The home page of the blog displays a list of articles, with the most recent ones at the top. It also includes like and save buttons. The comment button is linked to the complete article page, as well as if you click on the title or content of the article.

- Login and profile page

    Users can log in to the blog and access their profile page, which displays their personal information and allows them to modify their account settings. (Login using email/password or OAuth2 with Github provider)

- New articles creation

    Registered users can create new articles and publish them to the blog.

- New comment creation

    Users can leave comments on articles, they will apear in real time under the article.

- Resource access control

    Access to certain resources, such as the ability to create or modify articles, is restricted to registered users. Usage of RLS policy on supabase, check the supabase database pannel to see all policies.

- Article modification

    Registered users can modify their own articles, including updating the content and changing the title etc.

- Article removal

    Registered users can delete their own articles.

- Comment modification

    TODO

- Comment removal

    TODO

- Account settings

    Users can access their account settings to modify their personal information and change their password.

- Gravatar integration

    TODO

- Light/dark theme

    The blog includes a light and dark theme for users to choose from.
