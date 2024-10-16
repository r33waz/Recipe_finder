"use client";
import ReactPlayer from "react-player";

function VideoPlayer({ data }: { data: string }) {
  return (
    <>
      <div className="h-[600px]">
        <ReactPlayer
          url={data}
          controls={true}
          width="100%"
          height="100%"
          className="rounded-xl"
          light={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
              },
            },
          }}
          loop={true}
          volume={1}
          pip={true}
          playIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 14 14"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="M2.676.02a1.74 1.74 0 0 0-.845.218a1.64 1.64 0 0 0-.895 1.433v10.677a1.64 1.64 0 0 0 .895 1.433a1.74 1.74 0 0 0 1.718-.016l8.63-5.338a1.61 1.61 0 0 0-.001-2.876L3.548.253A1.74 1.74 0 0 0 2.676.02"
                clip-rule="evenodd"
              />
            </svg>
          }
        />
      </div>
    </>
  );
}

export default VideoPlayer;
