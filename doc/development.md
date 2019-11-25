### NPM Version Management
[Tutorial@medium.com](https://medium.com/@kevinkreuzer/publishing-a-beta-or-alpha-version-to-npm-46035b630dd7)

### Branches (Gitflow) 
Siehe https://gitversion.readthedocs.io/en/latest/git-branching-strategies/gitflow-examples/
* `master`: live. echte releases. (erst, wenn was published wurde kommt hier zeug aus'm 
develop branch rein)
* `develop`: nur fertige candidates hier drin (getestet und lauffähig)
* `release`: übergeordneter branch für next-level shit, der klar in versionen 
definiert ist (bsp: `release/2.0.1` oder `release/2.0.1-beta.0`)
* `hotfix`: echte fixes und workarounds für live (published) releases

## TODOs: 
* @kappaj: more examples readme
    * hier kommt kappaj's extrakt rein (aus der `README.md.old`) 
    * einzelinterval-examples zusammenfassen in einem standalone `AdvancedExample`
    * eigenständige node app (wie bei /examples/echo-example)
    * deinen test kram (seh ich als bestandteil - des im nächsten hauptpunkt erwähnten - deployments)
* das deployment müssen wir entwickeln:
    * npm scripte 
    * halbautomatisches script (also mit bestätigen)
    * jest test
    * ne release ablauf dokumentieren, was abgearbeitet werden muss:
        * getestet?
        * version korrekt erhöht?
        * müssen wir zusammen drüber sprechen
