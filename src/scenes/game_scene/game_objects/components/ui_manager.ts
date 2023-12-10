import { Component, DOMUILayer } from "smurf-engine";

export class UIManager extends Component{
    uiLayer!: DOMUILayer;
    snapButton: HTMLButtonElement = document.createElement('button');
    recordButton: HTMLButtonElement = document.createElement('button');
    isMediaRecording: boolean = false;

    start(){
        this.uiLayer = this.gameObject.getComponent(DOMUILayer)!;
    }

    onFirstUpdate(): void {
        this.initSnapButton();
        this.initRecordButton();
    }

    initSnapButton(){
        this.snapButton.innerText = 'Snap';
        this.snapButton.onclick = () => {
            let newWindow = window.open();
            this.engine.currentFrameAsURL((url)=>{
                newWindow?.location.replace(url);
            });
        }
        this.addButtonStyles(this.snapButton);
        this.snapButton.style.top = '10px';
        this.uiLayer.addElement(this.snapButton,"opaque");
    }

    initRecordButton(){
        this.recordButton.innerText = 'Record';
        this.recordButton.onclick = () => {
            if(!this.isMediaRecording){
                this.engine.startRecordingStream((url)=>{
                    let newWindow = window.open();
                    newWindow?.location.replace(url);
                });
                this.recordButton.innerText = 'Stop Recording';
                this.isMediaRecording = true;
            }else{
                this.engine.stopRecordingStream();
                this.recordButton.innerText = 'Record';
                this.isMediaRecording = false;
            }
        }
        this.addButtonStyles(this.recordButton);
        this.recordButton.style.top = '60px';
        this.uiLayer.addElement(this.recordButton,"opaque");
    }

    addButtonStyles(button: HTMLButtonElement){
        button.style.position = 'absolute';
        button.style.right = '10px';
        button.style.outline = 'none';
        button.style.border = 'none';
        button.style.padding = '10px';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.fontFamily = 'monospace';
        button.style.fontSize = '20px';
        button.style.cursor = 'pointer';
    }
}