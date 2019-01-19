[Back to blog posts](../blog.html)

A few years ago I was just getting started learning Drupal 8 and decided to try to play around with the Twig theming templates. I barely understood Drupal at the time so that was a bit of a mistake. Not really understanding what I was looking at meant that I was overwhelmed quickly by the number of files and not understanding what I was looking at inside of them. I soon realized that if I was going to work on a theme, I needed to try to understand Twig, but without the complexity of Drupal surrounding it.

I searched around trying to figure out how to build stuff with Twig and found some different options, but none of them seemed very understandable for me. They usually required something special running, or a server or whatever. So I finally ended up with something that seemed pretty simple and straightforward.

The main idea for this was to create a simple way to create Twig templates, add data that would populate the variables, and give me a way to practice and explore what Twig can do.

This still isn't as perfectly contained and simple as I would prefer, but I think it's something that should work well for most people who are just getting started and trying to understand how to work with Twig templates. The one main requirement is that you have [node.js installed](https://nodejs.org/en/) so that you can use the NPM package manager. Once you have that you can follow the directions in the project for everything else.

You'll also need to know how to work with SASS and JSON, but the JSON part is pretty easy and I give an overview that should hopefully get you started. You hopefully should know something about working in the command line. If you're not familiar, a great resource is the [Command Line Power User video series by Wes Bos](https://commandlinepoweruser.com/).

To view the files and download the code for this, go to: [github.com/rlahoda/twig_site_builder/](https://github.com/rlahoda/twig_site_builder)

The first thing you'll see is the Readme file. This has a lot of information that will help you and explain how the project is set up. There is a "dev" folder and a "prod" folder for your development and production code. You create your templates, sass files, add images and other assets, scripts, etc, into the "dev" folder and the Gulp task automatically starts a webserver, compiles the code, copies it over to the "prod" folder, opens your browser and loads the index.html page. It will also refresh the page as you save changes in your templates and other code.

Here are the basic steps to getting going:

- Copy the files to your computer
- Navigate in your command line program to that folder
- Type: <code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">npm install</code> and press enter to install all of the packages needed to run the setup
- Once everything's done, type <code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">gulp</code> in the command line and press enter to start the build process
- If everything went correctly, you should have a browser window open with the welcome message on it!

Now that the build process is going, you can start playing with the templates. They're located in the "dev/templates" folder. You'll see there's already an index.twig file there which has `{% include 'partials/header.twig' %}` in it to pull in the contents of another template. You can see that template is located in the "partials" directory.

Let's say you want to create a footer template for the index.twig file. All you have to do is go into the "partials" folder and create the file, we'll call it "footer.twig", and then go into your index.twig file and add an include where you want it to go:

```twig
<!DOCTYPE html>
<html lang="en" dir="ltr">

{% include 'partials/header.twig' %}

  <body>
<h1>Success!</h1>
<p>If you're seeing this, you enabled everything correctly!</p>

{% include 'partials/footer.twig' %}
  </body>
</html>
```

**It's very important that in Twig or SASS when you create a new template, partial, or anything that will be referenced from another file, you need to create the actual file first, then create the reference to it in your other templates or files. If you don't, there will be build errors and you'll have to restart Gulp after you fix the problem. So create footer.twig THEN add the include into the other file. Same goes for SASS: first create partial.scss THEN add the `@import` to the other scss file.**

Ok. So now you can create a single template and reference it from another template. Maybe you want an "about-me.html" so you create about-me.twig, be sure to include your header.twig and footer.twig and then put all of your other code in there as necessary.

The next step is getting that other data in there so you can start to understand how to work with variables. This is where the JSON comes in. I'll tell you now, this will probably be where you're going to have the most errors because you have to be just right with your JSON to avoid it causing problems. So to preemptively help you, here's a link to a [JSON formatter](https://jsonlint.com/) that will help you ensure your JSON is correct. If you're not familiar with JSON, here's a [quick tutorial](https://beginnersbook.com/2015/04/json-tutorial/) that should get you up to speed.

I tried to explain this in the Readme file on Github so I'm not going to repeat a lot of that here. Basically, you create a JSON file that goes along with each template file that you want to add content to by creating a file.twig.json file. So index.twig would have index.twig.json along with it. Only the Twig files at the root, so not in the partials directory, would need to have JSON with them. The thing I haven't figured out yet is how to use JSON from one of the partials so I don't have to repeat it. **So at least for now, for each main page you need a JSON file that contains all of the data you want on the page, even reusable data (like a nav bar).** So in my index.twig.json file I have a value for variables that are in my header.twig file:

```json
{
  "page": {
    "contenttitle": "test page"
  }
}
```

```twig
<head>
  <meta charset="utf-8">
  <link href="css/styles.css" rel="stylesheet"/>
  <title>{{page.contenttitle}}</title>
</head>
```

So there is a lot of flexibility that you can do with all of this. Using loops, logic and other stuff, you'll be able to get a good understanding of how Twig works so that when you are ready to start out with a Drupal theme you'll understand what you're doing with the Twig and only have to understand how Drupal interacts with it.

Here are a few other resources you can check out:

- [Get Twig into your texteditor (IDE - Integrated Design Environment)](https://twig.symfony.com/doc/2.x/templates.html#ides-integration)
- Don't understand the command line stuff? No problem! Check out [Twigfiddle](https://twigfiddle.com/) to play around with templates in an online environment</li>
- [Twig documentation](https://twig.symfony.com/doc/2.x/) which I've found to be pretty understandable for someone who's newer
- The [JSON validator](https://jsonlint.com/) that I mentioned earlier
- [A SASS intro guide](https://sass-lang.com/guide)

So I hope this makes sense, if you have any questions, comments or anything feel free to leave a comment below or reach out to me on [Twitter!](https://twitter.com/rlahoda/)

[Back to blog posts](../blog.html)
