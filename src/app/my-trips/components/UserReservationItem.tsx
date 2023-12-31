
import { Prisma } from "@prisma/client"
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import Button from "@/components/Button";

import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { AiOutlineCalendar } from "react-icons/ai"
import { BsPeople } from "react-icons/bs"



interface UserReservationItemProps {
    reservation: Prisma.TripReservationGetPayload<{include: {trip: true}}>;
    cancelReservation: (id: string) => void
}

const UserReservationItem = ({reservation, cancelReservation}: UserReservationItemProps) => {

    const {trip} = reservation

    const handleCancelClick = () => {
        cancelReservation(reservation.id)
    }

    return(
        <div>
            {/* CARD */}
            <div className="flex flex-col p-5 mt-5 border border-grayLighter border-solid shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image className="rounded-lg" src={trip.coverImage} fill style={{objectFit: "cover"}} alt={trip.name}/>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-xl text-primaryDarker font-semibold">{trip.name}</h1>

                        <div className="flex items-center gap-1">
                            <ReactCountryFlag countryCode={trip.countryCode} svg />
                            <p className="text-xs text-grayPrimary underline">{trip.location}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-5 text-primaryDarker">
                    <h3 className="text-sm flex items-center gap-1">
                        <AiOutlineCalendar size={16} className="text-primary"/>
                        Data
                    </h3>
                    <div className="flex items-center gap-1">
                        <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM ", {locale: ptBR})}</p>
                        {" - "}
                        <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM ", {locale: ptBR})}</p>
                    </div>


                    <h3 className="mt-5 text-sm flex items-center gap-1">
                        <BsPeople size={16} className="text-primary"/>
                        Hóspedes
                    </h3>
                    <p className="text-sm pb-3">{`${reservation.guests} hóspede${Number(reservation.guests) > 1 ? 's' : ''}`}</p>

                    <h1 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">Informações sobre o preço</h1>

                    <div className="flex justify-between items-center mt-1">
                        <p className="text-primaryDarker text-sm mt-2">Total:</p>
                        <p className="font-medium text-sm">R${Number(reservation.totalPaid)}</p>
                    </div>

                    {/* <Button variant="danger" className="mt-5" onClick={handleDeleteClick}> Cancelar </Button> */}

                    <AlertDialog.Trigger asChild>
                        <Button variant="danger" className="mt-5" onClick={handleCancelClick}> Cancelar </Button>
                    </AlertDialog.Trigger>

                    

                </div>
            </div>
        </div>
    )
}

export default UserReservationItem;