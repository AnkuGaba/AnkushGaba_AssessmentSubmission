import { Component } from '@angular/core';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {
  availableRooms: number[] = [];
  numRooms: number = 1;
  bookedRooms: number[] = [];
  hotelFloors: { [key: number]: number[] } = {};

  constructor(private hotelService: HotelService) {
    this.refreshFloors(); 
  }
  
  refreshFloors() {
    this.hotelFloors = this.hotelService.floors;
  }

  // Handle booking request
  bookRooms() {
    // this.bookedRooms = this.hotelService.findBestRooms(this.numRooms);
    this.bookedRooms = this.hotelService.bookRooms(this.numRooms);
    this.availableRooms = this.availableRooms.filter(room => !this.bookedRooms.includes(room));
    // const booked = this.hotelService.bookRooms(this.numRooms);
    // if (booked.length > 0) {
    //   this.bookedRooms.push(...booked);
    //   this.availableRooms = this.availableRooms.filter(room => !this.bookedRooms.includes(room));
    // }
    // this.hotelFloors = this.hotelService.floors;
    this.refreshFloors();
  }

  // Generate random room occupancy
  randomizeOccupancy() {
    this.hotelService.randomizeOccupancy();
    // this.hotelFloors = this.hotelService.floors;
    // this.bookedRooms = [];
    this.bookedRooms = [...this.hotelService.bookedRooms];
    this.refreshFloors();
  }

  // Reset booking
  resetHotel() {
    this.hotelService.resetHotel();
    // this.hotelFloors = this.hotelService.floors;
    this.bookedRooms = [];
    this.refreshFloors();
  }
}
