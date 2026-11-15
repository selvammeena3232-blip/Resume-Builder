export const printToPDF = () => {
  window.print();
};

export const exportToJSON = (data) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_Backup.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importFromJSON = (file, onSuccess, onError) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsedData = JSON.parse(e.target.result);
      onSuccess(parsedData);
    } catch (err) {
      onError('Invalid JSON file format. Please upload a valid resume backup.');
    }
  };
  reader.readAsText(file);
};
