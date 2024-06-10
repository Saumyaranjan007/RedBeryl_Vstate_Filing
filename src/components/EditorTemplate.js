import React, { useEffect, useRef, useState } from 'react'
import { Editor } from 'primereact/editor';
import 'quill/dist/quill.snow.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import SideBarMenu from '../common/Sidebar';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import 'pdfjs-dist/build/pdf.worker.entry'
import mammoth from 'mammoth';

console.log(pdfjsLib)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


const EditorTemplate = () => {
    const [content, setContent] = useState('');

    const [file, setFile] = useState(null)

    const [isContentSet, setIsContentSet] = useState(false);

    const [selectedValue, setSelectedValue] = useState(null);
    const editorRef = useRef(null);

    const predefinedValues = [
        { label: 'City', value: '${city}' },
        { label: 'Country', value: '${country}' },
        { label: 'Name', value: '${name}' },
    ];

    const insertText = () => {
        if (selectedValue && editorRef.current) {
            console.log(selectedValue)
            const editor = editorRef.current.getQuill();
            console.log(editor)
            editor.focus();
            setTimeout(() => {
                const range = editor.getSelection();
                console.log('Selected Value:', selectedValue);
                console.log('Editor Instance:', editor);
                console.log('Range:', range);


                const position = range ? range.index : editor.getLength();

                console.log('Position:', position);
                editor.insertText(position, selectedValue, "bold", true);
            }, 0);
        }
    };



    console.log(content)

    const handleExport = (format) => {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Content</title>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <style>
            /* Custom styles */
            .ql-container {
                border: 1px solid #ccc;
                border-radius: 4px;
                font-family: 'Arial', sans-serif; /* Default font family */
            }
            .ql-toolbar {
                border: 1px solid #ccc;
                border-bottom: none;
                border-radius: 4px 4px 0 0;
            }
            .ql-align-center{
                text-align:center;
            }

            .ql-font-monospace{
                font-family:monospace;
            }

            .ql-font-serif{
                font-family:serif;
            }

            
    .c49 {
        background-color: #ffffff;
        max-width: 451.5pt;
        padding: 72pt 72pt 72pt 72pt
            
        </style>
        </head>
        <body class="c49 doc-content">
        <div class="content-block">
            ${content}
            </div>
        </body>
        </html>
    `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                console.log(fileContent)
                setContent(fileContent);
                setIsContentSet(true)
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current.getQuill();
            if (editor && content) {
                console.log(content)
                editor.clipboard.dangerouslyPasteHTML(content);
                setIsContentSet(false)
            }
        }
    }, [isContentSet]);

    console.log(isContentSet)

    const addBorder = () => {
        if (editorRef.current) {
            const editor = editorRef.current.getQuill();
            const range = editor.getSelection();
            if (range) {
                editor.formatText(range.index, range.length, 'border', '1px solid black');
            }
        }
    };

    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],                                        // remove formatting button
                [{ 'border': '1px solid black' }],                // custom border button
                ['link', 'image', 'video']                        // link and image, video
            ],
            handlers: {
                'border': addBorder
            }
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedFile);
        fileReader.onload = async () => {
            const pdfData = new Uint8Array(fileReader.result);
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;

            let html = '';

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                console.log(page)
                const viewport = page.getViewport({ scale: 1 });
                const textContent = await page.getTextContent();
                console.log(textContent)

                const operatorList = await page.getOperatorList();
                console.log(pdf)
                // const pageHtml = [];
                // const imagePromises = [];

                // textContent.items.forEach(item => {
                //     const { str, transform } = item;
                //     const [x, y, , fontHeight] = transform;
                //     pageHtml.push(`<div style="position: absolute; left:${x}px; top:${viewport.height - y}px; font-size:${fontHeight}px;">${str}</div>`);
                // });
                
                // for (let i = 0; i < operatorList.fnArray.length; i++) {
                //     if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
                //         const imageName = operatorList.argsArray[i][0];
                //         const img = await page.objs.get(imageName);

                //         console.log(img)
                        
                //         if (img) {
                //             const canvas = document.createElement('canvas');
                //             const ctx = canvas.getContext('2d');
                //             canvas.width = img.width;
                //             canvas.height = img.height;
                            
                //             console.log(`Image width: ${img.width}, height: ${img.height}, data length: ${img.data.length}`);
                //             const expectedLength = 4 * img.width * img.height;
                //             console.log(`Expected data length: ${expectedLength}`);
    
                //             if (img.data.length === expectedLength) {
                //                 const imageData = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
                //                 ctx.putImageData(imageData, 0, 0);
                //                 const imgSrc = canvas.toDataURL();
                //                 pageHtml.push(`<img src="${imgSrc}" style="position: absolute; left:0; top:0; width:${img.width}px; height:${img.height}px;"/>`);
                //             } else {
                //                 console.error('Image data length mismatch:', img.data.length, 'vs', expectedLength);
                //             }
                //         }
                //     }
                // }

                const pageHtml = textContent.items.map(item => {
                    const { str, transform } = item;
                    const [x, y, , fontHeight] = transform;
                    return `<div style=" left:${x}px; top:${viewport.height - y}px; font-size:${fontHeight}px;">${str}</div>`;
                });

                html += `<div style=" width:${viewport.width}px; height:${viewport.height}px;">${pageHtml.join('')}</div>`;
            }
            console.log(html)
            const htmlContent = `
           <div>
           ${html}
           </div>
        `;
        
            setContent(htmlContent)
            setIsContentSet(true);

        }
    };

    const convertDocxToHtml = (docxFile) => {
        return mammoth.convertToHtml({ arrayBuffer: docxFile })
            .then((result) => {
                return result.value;
            })
            .catch((error) => {
                console.error('Error converting DOCX to HTML:', error);
                return null;
            });

    }

    const handleFileChange1 = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const docxFile = reader.result;
            const html = await convertDocxToHtml(docxFile);
            console.log(html)
            setContent(html);
            setIsContentSet(true)
        };
        // reader.readAsArrayBuffer(file);
    };

    console.log(content)


    return (
        <div className='grid'>
            <div className='col-2' style={{ backgroundColor: '#ffff' }}>
                <SideBarMenu />
            </div>
            <div className='col-10 ' style={{ backgroundColor: '#ffff' }}>
                <div className="card">
                    <div style={{ marginTop: '75px' }}>

                    </div>
                    <div className='grid'>

                        <div className='col-8'>
                            <Editor
                                ref={editorRef}
                                style={{ height: '320px' }}
                                value={content}
                                onTextChange={(e) => setContent(e.htmlValue)}
                                modules={modules}
                            />
                        </div>
                        <div className='col-4'>
                            <div className="p-col-12 p-md-6">


                                <div className='grid'>
                                    <div className='col-10'>
                                        <Dropdown
                                            value={selectedValue}
                                            options={predefinedValues}
                                            className='dialog-form-dropdown-field'
                                            onChange={(e) => setSelectedValue(e.value)}
                                            placeholder="Select a value"
                                        />
                                    </div>
                                    <div className='col-2'>
                                        <Button icon="pi pi-plus" onClick={insertText} />
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="p-col-12">
                        <Button label="Export as HTML" icon="pi pi-file" onClick={handleExport} />
                    </div>
                    <div className="p-col-12">
                        {/* <input type="file" accept="file" onChange={handleFileUpload} /> */}
                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                        {/* <input type="file" accept="file" onChange={handleFileChange1} /> */}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default EditorTemplate