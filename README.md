# Engineering Portfolio Website Generator
This is a portfolio website template for engineers that automatically creates a website for you. It assumes a very limited understanding of software development and walks you through the [setup](#setup) process. No coding necessary, just simply [edit the configuration](#how-to-use-the-config-files) files and your website is done.

It is highly customizable and even supports your own 3d models!

# Setup

## Install
You only need to install Node.js to get started.

**Option 1: Using Homebrew (if already using it on Mac)**
```bash
brew install node
```

**Option 2: Using NVM (Node Version Manager)**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use the latest stable Node.js
nvm install --lts
nvm use --lts
```

Choose whichever option works best for your system.
You can validate that node is installed correctly by running `node -v` which will output the version of node installed.

## Fork the Repository
Create your own copy of the project by forking the repository on GitHub. This gives you full control to make changes and setup your website. The fork button should be in the top right.

After forking, clone your copy to work with it locally. Copy the clone url from the code dropdown and then clone it with git. It will look like this:
```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
```

## Local development
Open the code in your favorite IDE. If you don't have one try [VS Code](https://code.visualstudio.com/).

Setup the project by running `npm i`. This installs all dependencies and sets up the code to be ready to run.

To see a local version of the website run `npm run dev`. Open it in your browser and you will see a live local version of the website. Any time you make changes you will see it updated while this is running.

**Note: If there are ever any problems the first thing to try would be running each of these again.**

# How Make Changes

You never need to touch the code. Just edit a config file, save it, and the code is handled behind the scenes for you. Because of this there are only two folders that you need to worry about `content` and `static`. You will edit files in `content` and drop your own files in `static`.

## `content`
This is where you make changes to the website. All parts of each page can be changed simply by writing in the `toml` for that page. Don't worry if you have never heard of `toml` before, think of it simply as a more structured text file (they will be very easy to edit). Full definitions of all things that can be changed in each file will be provided below (so feel free to ignore what you don't need).

### `site.toml` - configures website level changes  
Change the title in the tab bar of the website simply by changing what `title` equals:
```toml
title="Website Title" 
```
Change the icon in the tab bar by changing what `icon` equals:
```toml
icon="material-symbols:web-sharp"
```
**Where did this icon name come from? ->** for the icons across the whole website there is a large list of possible icons and their names that you can pull from. For the full list go [here](#using-an-icon).

Control the navbar by adjusting the appropriate navbar section.
```toml
[navigation.profile]
enabled=true
name="John Doe"
icon="devicon:bash"
```
All three of these act as you would expect. Set `enabled` to false if you don't want to turn off the page. Change the name of the page in the navbar with `name` and change the icon with `icon`.

### `home.toml` - configures the home profile page
Change your name or descriptions with:
```toml
name="John Doe"
description="This is my portfolio."
```
Add as many or as little contact methods as you want by adding or removing a contact that looks like this:
```toml
[[contacts]]
name = "GitHub"
link = "https://github.com/"
icon = "devicon:github"
# color = "#000000"
```
For each contact you can set all of these values with the `icon` and `color` properties being **optional**. This means that you don't need to include them. `color` is set with a hex color value. You can easily find any color in hex online or convert one, but if you are lookng for a color picker: [here](https://htmlcolorcodes.com/color-picker/). *(Don't forget the # in the color.)*

### `resume.toml` - configures the resume page
```toml
title="My Resume"
url="sample_resume.pdf"
```
The `url` is the name of the resume file. Use any resume pdf you want and simply drop the file in the `static` folder. The website will automatically find it and show it as long as the name is the same.

### `skills.toml` - configures the skills page
A brief explanation of toml syntax to make this make more sense. The double brackets with a word in it `[[sections]]` means that there can be multiple of something. Then a word with a dot then another word `[[sections.skills]]` means that the second belongs to the first. 

So here you can define multiple `[[sections]]` and each of the sections can have multiple skills `[[sections.skills]]` where the skill goes in that section.

Set the name of a section:
```toml
[[sections]]
name = "Programming Languages"
```
Add a new skill to the section:
```toml
[[sections.skills]]
name = "Rust"
icon = "devicon:rust"
color = "#FF0000"
```
Everything will be auto added and formatted as you add more.

### `projects.toml` - configures the projects page
You can add as many project cards as you want, and each one is fully customizable with its own grid system. Add a new project:
```toml
[[projects]]
type = "large"
total_rows = 6
total_cols = 6
# bg_color="#FFF"
# border_color="#FF0000"
# shadow_color="#FF0000"
```
The card can be `large` or `small` which changes the size. Then define how many rows and columns you want available on the grid. Additionally set an optional background color, border color, or shadow color.

Add an item to the grid:
```toml
[[projects.grid_item]]
rows = 1
cols = 2
type = "title"
content="Project Title"
# bg_color= "#000"
# text_color= "#fff"
```
Simply determine how many `rows` and `cols` on the grid you want the item to take up. It will auto place items starting from left to right then top to bottom. Set an optional background or text color.

Every `grid_item` will always have a `content` section but how this acts changes based on the `type`: title, text, image, or model. `title` makes the text large like a title, `text` is normal text, `image` looks for the image in the `static` folder, and `model` looks for the model in the `static` folder.

Example image:
```toml
[[projects.grid_item]]
rows = 2
cols = 2
type = "image"
content = "profile.png"
```
Example model:
```toml
[[projects.grid_item]]
rows = 4
cols = 4
type = "model"
content = "bucket_punch.glb"
bg_color= "#000"
text_color= "#fff"
```

### `experience.toml` - configures the experience page
This is configured almost exactly the same as the projects page because it uses the same customizable project card system. However it also lets you make sections out of them so that you can showcase projects done for specific companies.

Create an experience section:
```toml
[[experience]]
company = "Company Name"
position = "Position Held"
timeline = "Aug. 2024 - Sep. 2025"
```
Put a project in that section:
```toml
[[experience.projects]]
type = "large"
total_rows = 6
total_cols = 6
# bg_color="#FFF"
# border_color="#FF0000"
# shadow_color="#FF0000"
```
Put an item on the project card grid:
```toml
[[experience.projects.grid_item]]
rows = 2
cols = 2
type = "text"
content = "Lorem ipsum dolor..."
```

# Using an Icon
There are over 100,000 icons for you to choose from. You can use this [website](https://icones.js.org/collection/all) as a simple way to search for anything you want. 

Then once you find the icon you want just copy its name. The name will look something like this `material-symbols:work-outline` which defines where the website should pull the icon from. 

Everything is handled for you. Just copy and paste the icon names to use any icon. (If you ever have a problem after trying to add an icon you may have accidentally used a name that doesn't exist.)

*Note: if you use an icon that already has a color then setting the color won't do anything.*