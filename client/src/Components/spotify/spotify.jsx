import { useEffect, useState } from "react";
import useAuth from "../../utils/SpotifyApi/useAuthSpotify";
import SpotifyWebApi from "spotify-web-api-node";
import { Avatar, Input, Button } from "@nextui-org/react";
import SpotifyDashboard from "./SpotifyDashboard";
import SpotifyInit from "../../utils/SpotifyApi/spotifyLogin";
import Auth from "../../utils/auth";
import Player from "./Player";
import PopOver from "../Popover/popover"; 
import { POST_COMMENT } from "../../utils/Aplllo-Client/mutation";
import { GET_COMMENTS } from "../../utils/Aplllo-Client/queries";
import { GET_USER } from "../../utils/Aplllo-Client/queries";
import { useMutation, useQuery } from "@apollo/client";

const spotifyApi = new SpotifyWebApi({
  clientId: "bdd9da03ae0b4e068945d124833236e3",
});

export default function SpotifyPlayer( {code} ) {
  const accessToken = useAuth({code});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const [commentInfo, { error }] = useMutation(POST_COMMENT);
  const { data, loading } = useQuery(GET_USER);

  const userInitials = data?.user || {};
  // const userId = JSON.stringify(userInitials.username) || ""
  const userId = userInitials.username || "";

  const [comentsData, setCommentsData] = useState({
    commentText: "",
    commentAuthor: "ron",
  });

  console.log(userId);

  const { data: commentData } = useQuery(GET_COMMENTS);

  const firstInitial = userInitials[0];
  const lastInitial = userInitials[userInitials.length - 1];
  const joinInitials = firstInitial + "" + lastInitial;

  const allComments = commentData?.user.comments || {};
  // console.log(allComments)

  const commentToSet = async (event) => {
    const { name, value } = event.target;
    setCommentsData((prevData) => ({ ...prevData, [name]: value }));
  };
  const HandleComment = async () => {
    try {
      const { data } = await commentInfo({
        variables: { ...comentsData },
      });
    } catch (err) {
      console.log(err);
    }
    setCommentsData({
      commentText: "",
      commentAuthor: "",
    });
  };

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div
      style={{
        margin: "1%",
        height: "80vh",
        minWidth: "30%",
        overflowY: "scroll",
        alignContent: "center",
        border: "2px solid white",
        borderRadius: "14px",
        padding: "2%",
      }}
    >
      {accessToken && Auth.loggedIn() ? (
        <Input
          type="Search"
          label="Search"
          placeholder="Search for Songs/Albums"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          description="Rock with the Latest Music."
          className="max-w-xl mx-4"
        />
      ) : (
        <SpotifyInit />
      )}
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      <div
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        {searchResults.map((track) => (
          <SpotifyDashboard
            tracks={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          // position: "sticky",
          flexDirection: "column",
        }}
      >
        {playingTrack ? (
          <main
            style={{
              display: "block",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",

                flexDirection: "column",
                width: "100%",
                gap: "10px",
                padding: "1rem",
              }}
            >
              {allComments?.map((comment, index) => (
                <div
                  className="inline-flex mx-1"
                  style={{
                    color: "white",
                  }}
                  key={index}
                >
                  <PopOver />
                  <Input
                    isReadOnly
                    type="text"
                    label="Comments"
                    variant="bordered"
                    value={comment.commentText}
                    className="max-w-xs"
                  />
                </div>
              ))}

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderTop: "inset",
                  minWidth: "100%",
                  gap: "10px",
                  padding: "1rem",
                  color: "black",
                }}
              >
                <Avatar />
                <Input
                  type="text"
                  name="commentText"
                  label="Comment"
                  placeholder="Say Something!"
                  value={comentsData.commentText}
                  onChange={commentToSet}
                />
                <Button
                  onClick={HandleComment}
                  style={{ marginInline: "1%" }}
                  color="primary"
                  variant="ghost"
                >
                  Send
                </Button>
              </div>
            </div>
          </main>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
