type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType
}

const kindOfBlue:Album = {
  artist: 'Miles Davis',
  title: 'Kind of Blue',
  releaseDate: new Date('1959-08-17'),
  recordingType: "studio"
}

const albums = [kindOfBlue]

function getAlbumsOfType(recordingType: RecordingType): Album[] {
  return []
}

function pluck<T, K extends keyof T>(records:T[], key: K): T[K][] {
  return records.map(r => r[key])
}

pluck(albums, 'releaseDate')
pluck(albums, "artist")
pluck(albums, 'recordingType')
pluck(albums, 'releaseDate')