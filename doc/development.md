### NPM Version Management
[Tutorial@medium.com](https://medium.com/@kevinkreuzer/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7)

### Branches (Gitflow) 

Siehe https://gitversion.readthedocs.io/en/latest/git-branching-strategies/gitflow-examples/

* `master`: live. echte releases. (erst, wenn was published wurde kommt hier zeug aus'm 
develop branch rein)
* `develop`: nur fertige candidates hier drin (getestet uns lauffähig)
* `release`: übergeordneter branch für next-level shit, der klar in versionen 
definiert ist (bsp: `release/2.0.1` oder `release/2.0.1-beta.0`)
* `hotfix`: echte fixes und workarounds für live (published) releases
