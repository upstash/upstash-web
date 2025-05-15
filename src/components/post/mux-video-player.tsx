import MuxPlayer from "@mux/mux-player-react";

export const MuxVideoPlayer = ({ id }: { id: string }) => {
  return (
    <MuxPlayer
      playbackId={id}
      metadataVideoTitle="Placeholder (optional)"
      metadata-viewer-user-id="Placeholder (optional)"
      primary-color="#ffffff"
      secondary-color="#000000"
      accent-color="#4ae8a3"
      muted
    />
  );
};
