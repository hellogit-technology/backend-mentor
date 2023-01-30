const randomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const makeUniqueID = (type: 'event' | 'club', cityId: string, length: number) => {
  const time = Date.now();
  const timeCharacters = String(time).slice(7, 10); // 3 characters
  const identifyCharacters = {
    event: 'EV',
    club: 'CL'
  };
  const lastRandomCharacters = randomString(length);
  if (type === 'event') {
    const eventId = `${identifyCharacters.event}${cityId}${timeCharacters}${lastRandomCharacters}`;
    return eventId;
  } else {
    const clubId = `${identifyCharacters.club}${cityId}${timeCharacters}${lastRandomCharacters}`;
    return clubId;
  }
};
