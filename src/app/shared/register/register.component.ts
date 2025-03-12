import { Component } from '@angular/core';
import { IRegister } from 'src/app/interfaces/register.interface';
import { AppService } from "src/app/services/app.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario: IRegister = { email: "", password: "" };

  registrationError: string | null = null;

  constructor(private appService: AppService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.appService.register(this.usuario).subscribe({
        next: () => {
          console.log("User successfully registered");
          this.registrationError = null;
        },
        error: (err) => {
          console.error("Error registering user:", err);
          this.registrationError =
            "There was an error registering the user. Please try again.";
        },
      });
    }
  }
}

