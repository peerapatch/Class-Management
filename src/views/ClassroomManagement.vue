<template>
  <v-container>
    <v-container class="d-flex flex-row">
     
      <v-spacer />
      <v-btn @click="createRoom" width="150" color="green" class="white--text"
        >Create Room</v-btn
      >
    </v-container>

      <v-data-table
      
      :headers="headers"
      :items="classrooms"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="viewClassRoom(item)"> mdi-eye</v-icon>
        <v-icon @click="editClassRoom(item)"> mdi-pencil</v-icon>
        <v-icon @click="deleteClassRoom(item)" class="red--text">
          mdi-delete</v-icon
        >
      </template>
    </v-data-table>


    <v-dialog v-model="isCreateRoomDialogOpen" persistent>
      <v-card>
        <v-card-title>Create New Classroom</v-card-title>
        <v-container>
          <v-text-field
            v-model="create_form.classRoomId"
            label="Classroom Number"
          />
          <!-- <v-text-field v-model="create_form.type" /> -->
          <v-select
            v-model="create_form.type"
            :items="classroom_type"
            item-text="type"
            item-value="type"
            return-object
          ></v-select>
          <v-text-field
            v-model="create_form.capacity"
            label="Classroom Capacity"
          />
          <v-row>
            <v-col align-self="center"
              ><v-text-field v-model="accessoryName" label="Accessory"
            /></v-col>
            <!-- <v-col></v-col> -->
            <v-col align-self="center"
              ><v-btn
                width="150"
                color="green"
                class="white--text"
                @click="addAccessory(accessoryName , false)"
                >Add Accessory</v-btn
              ></v-col
            >
          </v-row>

          <h4>Accessories List</h4>
          <v-container
            v-if="create_form.accessories.length > 0"
            class="d-flex flex-wrap"
          >
            <v-chip
              outlined
              class="mx-2 my-2"
              v-for="item in create_form.accessories"
              :key="item"
              close
              @click:close="removeAccessory(item ,false)"
              >{{ item }}</v-chip
            >
          </v-container>
          <v-container v-else> - </v-container>
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn
            width="150"
            color="green"
            class="white--text"
            @click="confirm_createRoom"
            >Create</v-btn
          >
          <v-btn width="150" @click="cancel_createRoom">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isViewDialogOpen" persistent>
      <v-card>
        <v-card-title>{{ selected.classroomID }}</v-card-title>

        <v-container>
          
         <v-container><b>Classroom Type</b> : {{ selected.type }}</v-container>
          <v-container><b>Capacity</b> : {{ selected.capacity }}</v-container>
          <v-container>
            <b>Room Accessories</b>
          </v-container>
          <v-container class="d-flex flex-wrap">
            
            <v-chip class="mx-2 my-2" v-for="item in selected.accessory" :key="item"><b>{{ item }}</b></v-chip>
          </v-container>
          
        </v-container>
        <v-card-actions>
          <v-spacer/>
          <v-btn width="150" @click="close_viewClassRoom">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDeleteDialogOpen" persistent>
      <v-card>
      <v-card-title>Delete Classroom ?</v-card-title>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="confirm_deleteClassRoom" color="red" class="white--text">Delete</v-btn>
        <v-btn @click="cancel_deleteClassRoom">Cancel</v-btn>
        <v-spacer/>
      </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isEditDialogOpen" persistent>
       <v-card>
        <v-card-title>Edit Classroom</v-card-title>
        <v-container>
          {{ selected }}
          <v-text-field
            v-model="selected.classroomID"
            label="Classroom Number"
          />
          <!-- <v-text-field v-model="create_form.type" /> -->
          <v-select
            v-model="selected.type"
            :items="classroom_type"
            item-text="type"
            item-value="type"
            return-object
          ></v-select>
          <v-text-field
            v-model="selected.capacity"
            label="Classroom Capacity"
          />
          <v-row>
            <v-col align-self="center"
              ><v-text-field v-model="accessoryName" label="Accessory"
            /></v-col>
            <!-- <v-col></v-col> -->
            <v-col align-self="center"
              ><v-btn
                width="150"
                color="green"
                class="white--text"
                @click="addAccessory(accessoryName , true)"
                >Add Accessory</v-btn
              ></v-col
            >
          </v-row>

          <h4>Accessories List</h4>
          <v-container
            v-if="selected.accessory != null "
            class="d-flex flex-wrap"
          >
            <v-chip
              outlined
              class="mx-2 my-2"
              v-for="item in selected.accessory"
              :key="item"
              close
              @click:close="removeAccessory(item , true)"
              >{{ item }}</v-chip
            >
          </v-container>
          <v-container v-if="selected.accessory == {}"> - </v-container>
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn
            width="150"
            color="green"
            class="white--text"
            @click="confirm_editClassRoom"
            >Edit</v-btn
          >
          <v-btn width="150" @click="cancel_editClassRoom">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getAllClassRoom ,createNewRoom , deleteClassRoom , editClassRoom} from "../modules/fetch";
export default {
  name: "ClassroomManagement",
  created() {
    this.fetchClassRoom()
  },
  data() {
    return {
      isViewDialogOpen : false,
      isDeleteDialogOpen : false,
      isEditDialogOpen : false,
      selected : {},
      classrooms : [],
      headers: [
        {
          text: "Name",
          align: "start",
          
          value: "classroomID",
        },
        
        { text: "Type", value: "type" },
        { text: "Capacity", value: "capacity" ,sortable: true, },
        { text: "Action", value: "actions" },
      ],
      isCreateRoomDialogOpen: false,
      classroom_type: [
        { id: 0, type: "Lecture Room" },
        { id: 1, type: "Lab Room" },
      ],
      selected_classroom_type: { id: 0, type: "Lecture Room" },
      accessoryName: "",
      create_form: {
        classRoomId: "",
        type: { id: 0, type: "Lecture Room" },
        capacity: 0,
        accessories: [],
      },
    };
  },
  methods: {
    async fetchClassRoom() {
      let res = await getAllClassRoom()
      this.classrooms = res.users
    },
    clearForm() {
      this.create_form = {
        classRoomId: "",
        type: { id: 0, type: "Lecture Room" },
        capacity: 0,
        accessories: [],
      };
    },
    createRoom() {
      this.isCreateRoomDialogOpen = true;
    },
    async confirm_createRoom() {
      await createNewRoom({
        classRoomId: this.create_form.classRoomId,
        capacity: this.create_form.capacity,
        type: this.create_form.type.type,
        accessories: this.create_form.accessories,
      });

      this.clearForm();
      this.isCreateRoomDialogOpen = false;
      this.fetchClassRoom()
    },
    cancel_createRoom() {
      this.isCreateRoomDialogOpen = false;
      this.clearForm()
    },
    addAccessory(name, isEdit) {


      if(isEdit) {
         if (name != "") {
             this.selected.accessory.push(name);
             this.accessoryName = "";
      }

      } else {
      if (name != "") {
        this.create_form.accessories.push(name);
        this.accessoryName = "";
      }

      }
     
    },
    removeAccessory(accessoryName , isEdit) {

      if(isEdit) {
        let idx = this.selected.accessory.indexOf(accessoryName);
        this.selected.accessory.splice(idx, 1);
      } else {
        let idx = this.create_form.accessories.indexOf(accessoryName);
        this.create_form.accessories.splice(idx, 1);
      }

    },

  viewClassRoom(item) {
    this.selected = item
  this.isViewDialogOpen = true
    

  },

  close_viewClassRoom() {
    this.selected = {}
    this.isViewDialogOpen = false
  },
  
  deleteClassRoom(item) {
    
    this.isDeleteDialogOpen = true
    this.selected = item
  },
  async confirm_deleteClassRoom() {
    await deleteClassRoom(this.selected._id)
    this.selected = {}
    this.isDeleteDialogOpen = false
    this.fetchClassRoom()
  },
  cancel_deleteClassRoom() {
     this.isDeleteDialogOpen = false
     this.selected = {}
  },
  editClassRoom(item) {

    this.isEditDialogOpen = true
    this.selected = item;


  },
  async confirm_editClassRoom() {
    await editClassRoom(this.selected._id, this.selected)
    this.isEditDialogOpen = false
    this.selected = {};
    this.fetchClassRoom()


  },
  cancel_editClassRoom() {

    this.isEditDialogOpen = false
    this.selected = {};


  }

  },
};
</script>

<style>
</style>