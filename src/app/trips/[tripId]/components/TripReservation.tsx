"use client"


import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
    trip: Trip
}


const TripReservation = ({trip}: TripReservationProps) => {
    return(
        <div>
            <div className="flex flex-col px-5">
                <div className="flex gap-4">
                    <DatePicker placeholderText="Data de Início" onChange={() => {}} className="w-full"/>
                    <DatePicker placeholderText="Data Final" onChange={() => {}} className="w-full" />
                </div>

                <Input placeholder={`Número de hóspedes (máx: ${trip.maxGuests.toString()})`} className="mt-4" />

                <div className="flex justify-between mt-3">
                    <p className="font-medium text-sm text-primaryDarker">Total: </p>
                    <p className="font-medium text-sm text-primaryDarker">R$2500 </p>
                </div>

                <Button className="mt-3"> Reservar agora </Button>

            </div>
        </div>
    )
};

export default TripReservation;