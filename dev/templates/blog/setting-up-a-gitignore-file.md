I'll confess off the top now that I'm still pretty new to Git. I've started using it myself to keep track of files as I've been working, but I don't work on a team that uses Git so there are a lot of the functions that I don't really use yet. The .gitignore file is one that took me a little to figure out so I thought I'd write up a quick post talking about what this little file does.

If you're not familiar with Git to begin with, it's a version control system that allows for users to work on different parts of a project, track the changes and bring those updated files together into a master code base. This is most often used in software development and other coding environments like web development. The whole idea of Git is pretty complex so I won't try to explain it any more right here. If you want more information, the best thing is to check out the [Git homepage](https://git-scm.com/) and read some info there.

The .gitignore file is a special file that tells Git what files you don't want to track in your project. Why wouldn't you want to track everything? Well, there are lots of reasons. Temporary files, system files, log files, anything that isn't actually part of your code base is what you'd want to leave out of your Git tracking. This helps save space in your Git backups and also cleans up a lot of the clutter in the file system.

So a few things to know about working with a .gitignore file:

**1. You have to create the file yourself**

It doesn't automatically get created when you `git init` in a folder. You have to create it yourself and put it in the folder that you're going to `git init` into for it to be recognized.

**2. Create the file before you init in the folder**

Before you `git init` you should create the .gitignore file. The reason for this is that if you `git init` first, commit your project then realize there's a ton of stuff you didn't want to add, it's a pretty clunky process to remove them from tracking. You could do it: you'd have to enter `git rm --cached <file>` for every file you wanted to remove. That's not too big of a deal if you realize there is one file here or there that you want to remove. But what if you have to remove a folder with hundreds of files? So yeah, remember to have the .gitignore in place **before** you start tracking your files.

**3. You can ignore individual files, types of files and folders**

You might know that there's a specific file you have in your project that doesn't need to be tracked so you can point to that specifically. So you might put `unused.txt` into your .gitignore. Maybe you know there are log files or temp files that would just add a lot of clutter to the project so you could put `*.log` into your file. The `*` is a wildcard indicator so by putting it in front of the `.log` you're saying that any file that ends in `.log` will be ignored. You can also put whole folders into the .gitignore. When working with NPM projects I prefer not to track my modules directory. So I have `node_modules` listed in my .gitignore file. This means that nothing in that folder is going to be tracked.

**4. You can make sure a file/folder is tracked by negating a pattern**

So if you had `*.log` in your file but you know that there's one log file you really want saved you can put the line in: `!superimportantlogfile.log` and it will be tracked even though the rest of the `.log` files will not. This goes for folders or anything you've put in that could match more than one file but be careful. If you say to ignore a folder but then want something in it to be tracked still, it's not going to happen. Git won't track an individual file inside a folder that isn't being tracked.

**5. You can point to files inside your file structure**

You're not limited only to files in the same folder as the .gitignore file. If you know you want a random file deep in your structure you could put `path/to/the/file.html` and Git will know not to touch that file. The path is relative to where the .gitignore file is located so keep that in mind when you point to deeper paths in your project.

**6. You can add notes for yourself**

Anything starting with a `#` will be ignored by Git. So if you have a very specific file located at a location and you wanted to remember why you were ignoring it, you could write a little note above your filter and ensure that your future self or others on your team will be able to know why that file is or isn't being tracked.

So there you have it. Hopefully you learned a little more about working with a .gitignore file. Just as an example, here's my .gitignore file for projects I'm working on at the moment:

```javascript
#  logs - this is using the wildcard to filter any files ending in .log
*.log
# project dependencies - this is a folder
node_modules
# OSX folder attributes
.DS_Store
# temporary files - this points to anything starting or ending with tmp
*. tmp *~
# Zip files
*.zip
```

For more ideas and help, here's a long [list of .gitignore ideas](https://github.com/github/gitignore) on GitHub. Here's the [official documentation](https://git-scm.com/docs/gitignore) for .gitignore from Git itself.
