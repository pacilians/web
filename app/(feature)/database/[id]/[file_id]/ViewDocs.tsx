"use client";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

export default function ViewDocs({ data }: any) {
  console.log(data);
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Open: () => <></>,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
  });

  const renderToolbar = (
    // eslint-disable-next-line no-unused-vars
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    // eslint-disable-next-line no-unused-vars
    sidebarTabs: (defaultTabs) => [],
    renderToolbar,
  });

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
      <Viewer
        fileUrl={data.file.data}
        plugins={[defaultLayoutPluginInstance]}
        defaultScale={SpecialZoomLevel.PageWidth}
      />
    </Worker>
  );
}