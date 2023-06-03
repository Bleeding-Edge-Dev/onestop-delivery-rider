import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-my-target",
  templateUrl: "./my-target.component.html",
  styleUrls: ["./my-target.component.scss"],
})
export class MyTargetComponent implements OnInit {
  @Input() myTargetData: any;

  constructor() {}

  ngOnInit() {}
}
