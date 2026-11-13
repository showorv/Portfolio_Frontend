import MediaBrowser from "@/components/admin/MediaBrowser";
import { PageHeader } from "@/components/admin/ui";

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media library"
        description="Every image you have uploaded. Copy a URL here, or pick these images from any project, blog or skill form."
      />
      <MediaBrowser />
    </>
  );
}
