import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppStore } from './store';
import { Room } from './Room';
import { DEFAULT_ROOM_LENGTH, DEFAULT_TILE_SIZE, TILE_TYPE } from './constants';

function App() {
  const [roomLengthStr, setRoomLengthStr] = useState<string>(
    DEFAULT_ROOM_LENGTH.toString()
  );
  const [tileSizeStr, setTileSizeStr] = useState<string>(
    DEFAULT_TILE_SIZE.toString()
  );
  const [file, setFile] = useState<string>();

  const [roomMatrixStr, setRoomMatrixStr] = useState<string>('');

  const {
    roomLength,
    displayGrid,
    setDisplayGrid,
    setRoomLength,
    setTileSize,
    setRoomMatrix,
  } = useAppStore();

  const appRef = useRef<HTMLDivElement>(null);

  const generateDefaultRoomMatrix = (roomLength: number) => {
    let roomMatrixString = '[\n';
    for (let row = 0; row < roomLength; row++) {
      roomMatrixString += '[';
      for (let col = 0; col < roomLength; col++) {
        // Create empty room matrix
        roomMatrixString += TILE_TYPE.FLOOR;

        if (col !== roomLength - 1) {
          roomMatrixString += ', ';
        }
      }
      roomMatrixString += ']';
      if (row !== roomLength - 1) {
        roomMatrixString += ',\n';
      }
    }

    roomMatrixString += '\n]';

    setRoomMatrixStr(roomMatrixString);
    setRoomMatrix(JSON.parse(roomMatrixString));

    return roomMatrixString;
  };

  // When room length input changes, generate default room matrix
  useEffect(() => {
    generateDefaultRoomMatrix(roomLength);
  }, [roomLength]);

  const handleRoomLengthChange = (val: string) => {
    if (val === '') {
      setRoomLength(1);
      setRoomLengthStr('0');
      return;
    }

    const valInt = parseInt(val);

    if (Number.isNaN(valInt)) {
      console.error('Not a valid room length input');
      return;
    }

    if (valInt > 29) {
      setRoomLength(29);
      setRoomLengthStr('29');
      console.error('Room length is too large');
      return;
    }

    setRoomLength(valInt);
    setRoomLengthStr(valInt.toString());
  };

  const handleTileSizeChange = (val: string) => {
    if (val === '') {
      setTileSize(16);
      setTileSizeStr('0');
      return;
    }

    const valInt = parseInt(val);

    if (Number.isNaN(valInt)) {
      console.error('Not a valid room length input');
      return;
    }

    if (valInt > 64) {
      setTileSize(64);
      setTileSizeStr('64');
      console.error('Room length is too large');
      return;
    }

    setTileSize(valInt);
    setTileSizeStr(valInt.toString());
  };

  const handleGenerateRoomMatrix = (roomMatrixStr: string) => {
    const roomMatrix = JSON.parse(roomMatrixStr);
    setRoomMatrix(roomMatrix);
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
    <div className="flex flex-col items-center pb-20" ref={appRef}>
      <div className="my-10">
        <h1 className="mb-2 uppercase">
          R<span className="text-4xl">eturn</span>{' '}
          <span className="text-4xl">to</span> O
          <span className="text-4xl">lympus</span>
        </h1>
        <h2>Room Maker</h2>
      </div>
      <div className="flex gap-10 mb-5">
        <div className="flex items-center">
          <label className="mr-3">Room Length: </label>
          <input
            className="w-[50px]"
            value={roomLengthStr}
            onChange={(e) => handleRoomLengthChange(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="mr-3">Room Length: </label>
          <input
            className="w-[50px]"
            value={tileSizeStr}
            onChange={(e) => handleTileSizeChange(e.target.value)}
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

        <div className="flex items-center">
          <label className="mr-3">Display Grid: </label>
          <input
            type="checkbox"
            checked={displayGrid}
            onChange={() => setDisplayGrid(!displayGrid)}
          />
        </div>
      </div>

      <div className="mb-5 relative w-[50%] flex flex-col items-center">
        <div className="mb-3">
          <label htmlFor="roomMatrix" className="text-xl">
            Room Matrix:
          </label>
        </div>
        <textarea
          id="roomMatrix"
          value={roomMatrixStr}
          onChange={(e) => setRoomMatrixStr(e.target.value)}
          className="p-2 bg-zinc-700 text-white border border-white rounded mb-3"
          style={{ width: '100%', height: 350 }}
        />
        <div className="flex">
          <button
            onClick={() => generateDefaultRoomMatrix(roomLength)}
            className="hover:border-white"
          >
            Reset Matrix
          </button>
          <button
            onClick={() => handleGenerateRoomMatrix(roomMatrixStr)}
            className="hover:border-white"
          >
            Generate Matrix
          </button>
        </div>
      </div>

      <Room />

      <img src={file} />
    </div>
  );
}

export default App;
