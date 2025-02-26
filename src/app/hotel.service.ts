import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  floors: { [key: number]: number[] } = {};
  totalFloors = 10;
  bookedRooms: number[] = [];

  constructor() {
    this.initializeRooms();
  }

  initializeRooms() {
    for (let i = 1; i <= this.totalFloors; i++) {
      this.floors[i] = i === 10 ? [1001, 1002, 1003, 1004, 1005, 1006, 1007] : Array.from(
        { length: 10 },
        (_, index) => i * 100 + (index + 1)
      );
    }
  }

  getAllRooms() {
    return this.floors;
  }

  getBookedRooms() {
    return this.bookedRooms;
  }


  bookRooms(numRooms: number): number[] {
    const bookedRooms: number[] = [];
  
    // Step 1: Try to book rooms on a single floor first
    for (let floor = 1; floor <= 10; floor++) {
      const availableOnFloor = this.floors[floor].filter(room => !this.bookedRooms.includes(room));
      if (availableOnFloor.length >= numRooms) {
        bookedRooms.push(...availableOnFloor.slice(0, numRooms));
        break;
      }
    }
  
    // Step 2: If not enough rooms are found on a single floor, select the best combination across floors
    if (bookedRooms.length < numRooms) {
      for (let floor = 1; floor <= 10 && bookedRooms.length < numRooms; floor++) {
        const availableOnFloor = this.floors[floor].filter(room => !this.bookedRooms.includes(room));
        for (const room of availableOnFloor) {
          if (bookedRooms.length < numRooms) {
            bookedRooms.push(room);
          } else {
            break;
          }
        }
      }
    }
  
    this.bookedRooms.push(...bookedRooms);
    return bookedRooms;
  }


  resetHotel() {
    this.bookedRooms = [];
    this.initializeRooms();
  }

  randomizeOccupancy() {
    console.log('Randomizing room occupancy...');
    
    this.bookedRooms = []; // Reset all bookings
    let totalRooms = 97;
    let numToOccupy = Math.floor(Math.random() * (totalRooms / 2)); // Randomly occupy up to 50% of rooms
  
    let allRooms: number[] = [];
  
    // Collect all available rooms
    for (let floor = 1; floor <= 10; floor++) {
      allRooms.push(...this.floors[floor]);
    }
  
    // Shuffle and select rooms to occupy
    allRooms = allRooms.sort(() => Math.random() - 0.5);
    this.bookedRooms = allRooms.slice(0, numToOccupy);
  
    console.log("Randomly booked rooms:", this.bookedRooms);
  }
  
}
