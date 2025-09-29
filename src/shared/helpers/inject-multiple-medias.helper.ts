import { IMediaItem } from "src/shared/interfaces/media-item.interface";

export async function injectMultipleMedias<T extends { ids_media?: string[] }>(
  items: T[],
  getMedias: (ids: string[]) => Promise<IMediaItem[]>
): Promise<(Omit<T, "ids_media"> & { ids_media: (IMediaItem | string)[] })[]> {
  const mediaIds = items
    .flatMap((item) => item.ids_media || [])
    .filter((id): id is string => !!id);

  if (!mediaIds.length) {
    return items.map((item) => ({ ...item, ids_media: [] }));
  }

  const medias = await getMedias(mediaIds);
  const mediaMap = new Map(medias.map((media) => [media.id, media]));

  return items.map((item) => ({
    ...item,
    ids_media: (item.ids_media || []).map((id) => mediaMap.get(id) ?? id),
  }));
}
