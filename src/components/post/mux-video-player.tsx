import MuxPlayer from "@mux/mux-player-react";

export const MuxVideoPlayer = ({ id }: { id: string }) => {
  return (
    <div className="-mx-5 overflow-hidden rounded-xl md:-mx-6">
      <MuxPlayer
        playbackId={id}
        metadataVideoTitle="Placeholder (optional)"
        metadata-viewer-user-id="Placeholder (optional)"
        primary-color="#ffffff"
        secondary-color="#000000"
        accent-color="#4ae8a3"
        muted
      />
    </div>
  );
};
