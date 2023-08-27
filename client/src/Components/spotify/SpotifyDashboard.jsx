import PlayButton from "../Animations-formIcons/formIcons/playButton";

import { User } from "@nextui-org/react";

export default function SpotifyDashboard({ tracks, chooseTrack }) {
  function playHandler() {
    chooseTrack(tracks);
  }

  return (
    <main>
      <div
        style={{
          marginInline: "2%",
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#593028",
          border: "1px solid white",
          borderRadius: "14px",
          width: "100%",
        }}
      >
        <div
          onClick={playHandler}
          style={{
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <User
            avatarProps={{ radius: "lg", size: "lg", src: tracks.albumUrl }}
            description={tracks.artist}
            name={tracks.title}
           
          ></User>

          <PlayButton />
        </div>
      </div>
    </main>
  );
}
