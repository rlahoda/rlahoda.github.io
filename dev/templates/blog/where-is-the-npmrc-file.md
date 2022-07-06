I've been through this a couple times now because I wanted to move my NPM global install location to a new spot where I wasn't constantly dealing with permissions issues and both times it was a bigger hassle than it probably should have been. I was able to find a [great guide](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) for how to change the default global installation location for NPM but there was one minor point of confusion. The author states:

> Indicate to `npm` where to store globally installed packages. In your `~/.npmrc` file add:
> `prefix=${HOME}/.npm-packages`

This is great, except there's no .npmrc file there. For reference, the `~/` is referring to the user's home directory. So I did some searching and was able to find the [NPM official documentation for NPMRC](https://docs.npmjs.com/files/npmrc) which states the location for the global NPMRC file is: global config file `$PREFIX/etc/npmrc`.

What's that mean? `$PREFIX`? So more searching around and I found the [documentation for PREFIX](https://docs.npmjs.com/cli/prefix) on NPM. That told me that I could check the location of `PREFIX` by entering `npm prefix -g` (the -g indicates it's for a global search). Which lead me to something like `/usr/local/bin` or something like that. So I checked there and didn't find the file. I looked all over and couldn't find it. Finally I found a random comment on a page that pointed me to the piece of information that nobody seemed to want to add to their page:

### You have to create the .npmrc file yourself

Yep, just like the [.gitignore](setting-up-a-gitignore-file.html) file, you generally have to create this file. So after you follow the directions to create the appropriate folder, go to your user home folder and create a new file called .npmrc and enter the information specified in the guide above: `prefix=${HOME}/.npm-packages`. Then you're set to go! Be sure to put the additional information into your .zshrc and/or bashrc files as well so they know what to do:

```javascript
NPM_PACKAGES="${HOME}/.npm-packages"

PATH="$NPM_PACKAGES/bin:$PATH"

# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```

Good luck!
