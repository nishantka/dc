import {createTag} from "../../scripts/miloUtils.js";
// const {loadScript} = await import(`https://main--milo--adobecom.hlx.page/libs/utils/utils.js`);

const handleDragOver = (e) => {
  e.preventDefault();
}

const handleDrop = (e) => {
  // let datas;
  e.preventDefault();
  console.log(e.dataTransfer.files);
  if (e.dataTransfer.items) {
    [...e.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);
      }
    });
  } else {
    [...e.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }

}



export default function init(element) {
  console.log(element.querySelectorAll(':scope > div'));
        //Create Fake Widget
        createTag.then((tag) => {
          const content = element.querySelectorAll(':scope > div');

          Array.from(content).forEach( (con) =>{
            con.classList.add('hide')
          })

          const wrapper = tag('div', {id: 'CID', class: `fsw widget-wrapper ` });
          const heading = tag('h1', { class: 'widget-heading' }, `${content[1].textContent}`);
          const dropZone = tag('div', { id: 'dZone', class: 'widget-center' });
          const copy = tag('p', { class: 'widget-copy' }, `${content[2].textContent}`);
          const button = tag('input', { type: 'file', id: 'file-upload', class: 'hide' }, `${content[3].textContent}`);
          const buttonLabel = tag('label', { for: 'file-upload', class: 'widget-button' }, `${content[3].textContent}`);
          const legal = tag('p', { class: 'widget-legal' }, `${content[4].textContent}`);
          const icon = tag('p',{ class: 'widget-sub' } , 'Adobe Acrobat');
          wrapper.append(icon);
          wrapper.append(heading);
          wrapper.append(dropZone)
          dropZone.append(copy);
          dropZone.append(button);
          dropZone.append(buttonLabel);
          wrapper.append(legal);
          element.append(wrapper);


          const dcWidgetScript = tag('script', {
            id: 'adobe_dc_sdk_launcher',
            src: 'https://stage.acrobat.adobe.com/dc-hosted/3.10.0_2.16.2/dc-app-launcher.js',
            'data-dropzone_id': 'CID',
            'data-locale': 'us-en',
            'data-server_env': 'stage',
            'data-verb': 'word-to-pdf',
            'data-load_typekit': 'false',
            'data-load_imslib': 'false',
            'data-enable_unload_prompt': 'true',
          });

          dropZone.addEventListener('dragover', (file) => {
            handleDragOver(file);
            element.append(dcWidgetScript);
          })

          dropZone.addEventListener('drop', (file) => {
            handleDrop(file);
            //make call to dc web and pass over file 
            //https://api-ninjas.com/signin

            element.append(dcWidgetScript);
            // loadScript('https://stage.acrobat.adobe.com/dc-hosted/3.10.0_2.16.2/dc-app-launcher.js');


          })
        })

}
