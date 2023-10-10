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

export default function CreateAnnouncement({ isVisible, onClose }: CreateAnnouncementProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={() => onClose()}>
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={() => onClose()}>
          x
        </button>
        <div className="bg-white p-2 rounded">ini form anc</div>
      </div>
    </div>
  );
}
