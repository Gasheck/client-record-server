import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Appointment } from "./appointment.model";
import { AppointmentService } from "./appointment.service";
import { AppointmentInput } from "./dto/appointment.input";

@Service()
@Resolver(Appointment)
export class AppointmentResolver {
    constructor(private appointmentService: AppointmentService) {}

    @Query(() => [Appointment])
    appointments() {
        return this.appointmentService.findAll();
    }

    @Query(() => Appointment)
    appointment(@Arg("id", () => ID) id: number) {
        return this.appointmentService.findOneById(id);
    }

    @Mutation(() => Appointment)
    async createAppointment(
        @Arg("inputAppointment") newAppointment: AppointmentInput
    ) {
        return this.appointmentService.save(newAppointment);
    }

    @Mutation(() => Appointment)
    updateAppointment(
        @Arg("inputAppointment") inputAppointment: AppointmentInput
    ) {
        return this.appointmentService.save(inputAppointment);
    }

    @Mutation(() => Boolean)
    deleteAppointment(@Arg("id", () => ID) id: number) {
        return this.appointmentService.delete(id);
    }
}
