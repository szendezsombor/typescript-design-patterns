interface Button {
    click(): void;
}

abstract class ButtonCreator {
    public abstract createButton(): Button;
}

class IEButtonCreator extends ButtonCreator {
    public createButton(): Button {
        return new IEButton();
    }
}

class ChromeButtonCreator extends ButtonCreator {
    public createButton(): Button {
        return new ChromeButton();
    }
}

class IEButton implements Button {
    public button: any;

    click(): void {
        this.button?.oldFashionedClicking();
    }
}

class ChromeButton implements Button {
    public button: any;

    click(): void {
        this.button?.theModernWayOfClicking();
    }
}

function iJustWantToClickAButton(someButton: Button) {
    someButton.click();
}

const isInternetExplorer = true;

if (isInternetExplorer) {
    iJustWantToClickAButton(new IEButtonCreator().createButton());
} else {
    iJustWantToClickAButton(new ChromeButtonCreator().createButton());
}

