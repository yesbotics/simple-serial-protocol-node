# Development
dev dev dev

## Branches (Gitflow) 
inspiriert durch [GitFlow Examples]
* `master`: live. echte releases. (erst, wenn was published wurde kommt hier zeug aus'm 
develop branch rein)
* `develop`: nur fertige candidates hier drin (getestet und lauffähig)
* `release`: übergeordneter branch für next-level shit, der klar in versionen 
definiert ist (bsp: `release/2.0.1` oder `release/2.0.1-beta.0`)
* `hotfix`: echte fixes und workarounds für live (published) releases

## TODOs
### Kommunikation, wie?
* modrob/yesbotics tg-channel
* via textdateien wie im hierigen fall
* via issues gitlab

### DevOps DevOps DevOps: 
* simple-serial-protocol-docs aufbauen unter zuhilfenahme von [Markdown: Links and Cross References]
* @kappaj: more examples readme
    * hier kommt kappaj's extrakt rein (aus der `README.md.old`) 
    * einzelinterval-examples zusammenfassen in einem standalone `AdvancedExample`
    * eigenständige node app (wie bei /examples/echo-example)
    * deinen test kram (seh ich als bestandteil - des im nächsten hauptpunkt erwähnten - deployments)
* das deployment müssen wir entwickeln:
    * npm scripte 
    * halbautomatisches script (also mit bestätigen)
        * npm login
        * npm publish
            * prepublish muss testen
    * jest test
    * ne release ablauf dokumentieren, was abgearbeitet werden muss:
        * getestet?
        * version korrekt erhöht?
        * müssen wir zusammen drüber sprechen

## Links
* [GitFlow Examples](https://gitversion.readthedocs.io/en/latest/git-branching-strategies/gitflow-examples)
* [Markdown-Cheatsheet#links](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)
* [Markdown: Links and Cross References](https://dotnet.github.io/docfx/tutorial/links_and_cross_references.html)
* [Publishing a beta or alpha version to NPM](https://medium.com/@kevinkreuzer/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7)