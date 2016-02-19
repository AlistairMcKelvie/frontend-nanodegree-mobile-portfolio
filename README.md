## Website Performance Optimization portfolio project
###Viewing the Site
* The site can be viewed locally by opening dist/index.html in a web browser.
* The site can be hosted online using Ngrok. With Ngrok installed:

  ```bash
  $> cd /path/to/project-folder
  $> cd dist
  $> python -m SimpleHTTPServer 8080
  ```

  In another terminal:
     ``` bash
  $> cd /path/to/project-folder
  $> cd dist
  $> ngrok http 8080
  ```
  The the site will then be accessible at the URL displayed in the Ngrok window.

###Building the Project
The project can be built from source, which resides in the *src* directory. To do this the NPM, Grunt, and Imageoptim must be installed on the machine, and on the path.
``` bash
$> cd /path/to/project-folder
$> npm install
$> grunt
```

This will build the project in the *dist* directory, including producing multiply sized version of images for responsive images, inline the critcal css, compress the images, and minify the HTML, CSS, and Javascript. Grunt can also be used to do validation on the Javascript and HTML in the project using ```grunt validate```, and can be tested with Google PageSpeed Insights as follows:
```bash
$> cd /path/to/project-folder/dist
$> cd dist
$> python -m SimpleHTTPServer 8080
```
In another terminal:
``` bash
$> cd /path/to/project-folder
$> grunt psi-ngrok
$> ngrok http 8080
```
###Optimizations to Pizza Javascript
The performance of the scrolling pizzas was improved by;
* Reducing the number of pizzas to only the number required to fill the screen.
* Calling the update postion function inside requestAnimationFrame.
* Using the *will-change: transform* css property on the pizzas to force them into a their own layer and reduce drawing.
* Keeping a permanent reference to the pizzas objects so the document does not need to be query for them every update.
The performance of resizing the stationary pizzas was improved by;
* Only querying once for the pizzas, rather then many times in the update.
* Just basing the new size of the pizzas on the the current size of the window rather than changing them with respect to their old size.

