import { Participant } from "./lotteryContract"

export const editParticipants = (participants: Participant[], player: string, tickets: number) => {
  const participant = participants.find((p) => p.playerAddress === player)
  if (participant) {
    return participants.map((p) =>
      p.playerAddress === player
        ? {
            ...p,
            numberOfTickets: +p.numberOfTickets + +tickets,
          }
        : p
    )
  } else {
    return [
      ...participants,
      {
        playerAddress: player,
        numberOfTickets: +tickets,
      },
    ]
  }
}
