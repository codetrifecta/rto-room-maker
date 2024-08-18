import { ChangeEvent, useState } from 'react';
import './App.css';

function App() {
  const [roomLengthStr, setRoomLengthStr] = useState<string>('15');
  const [file, setFile] = useState<string>();

  const handleRoomLengthChange = (val: string) => {
    if (val === '') {
      setRoomLengthStr('0');
      return;
    }

    const valInt = parseInt(val);

    if (Number.isNaN(valInt)) {
      console.error('Not a valid room length input');
      return;
    }

    setRoomLengthStr(valInt.toString());
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (e.target.files === null) {
      console.error('Input files is null');
      return;
    }

    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-10">RtO Room Maker</h1>
      <div className="flex gap-10">
        <div className="flex items-center">
          <label className="mr-3">Room Length: </label>
          <input
            className="w-[50px]"
            value={roomLengthStr}
            onChange={(e) => handleRoomLengthChange(e.target.value)}
          />
        </div>

        <div className="flex">
          <button
            className="hover:border-white"
            onClick={() => {
              const fileInput = document.getElementById('file-input');

              if (fileInput === null) {
                console.error('File input is null');
                return;
              }

              fileInput.click();
            }}
          >
            Input tile art
          </button>
          <input
            id="file-input"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <img src={file} />
    </div>
  );
}

export default App;
