// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Announcement | BNI Custody System",
//   description: "",
// };

type CreateAnnouncementProps = {
  isVisible: boolean;
  onClose: () => void;
};
// const handleClose = (e: React.MouseEvent<HTMLDivElement>, onClose: CreateAnnouncementProps['onClose']) => {
//   if ((e.target as HTMLElement).id === "wrapper") onClose();
// }
// const handleCloseX = (e) => {
//   if(e.target.id == "wrapper") onClose()
// }

export default function CreateAnnouncement({
  isVisible,
  onClose,
}: CreateAnnouncementProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
      id="wrapper"
      onClick={() => onClose()}
    >
      <div className="flex w-[600px] flex-col">
        <button
          className="place-self-end text-xl text-white"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className="rounded bg-white p-2">ini form anc</div>
      </div>
    </div>
  );
}
