import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/entities/categories/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { VideosService } from 'src/app/services/videos/videos.service';
@Component({
  selector: 'app-videoupload',
  templateUrl: './videoupload.component.html',
  styleUrls: ['./videoupload.component.scss']
})
export class VideouploadComponent implements OnInit {
  uploadForm: FormGroup
  privacyOptions: string[] = ['public', 'private'];
  categoryList: Categories[] = []
  loadingResources: Boolean = true;

  constructor(private catService: CategoriesService, private videoService: VideosService, private snack: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.required],
      language: ['', Validators.required],
      video: ['', Validators.required],
      poster: ['', Validators.required],
      privacy: ['public', Validators.required]
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.catService.getAllCat().subscribe((res) => {
      this.categoryList = res;
      this.loadingResources = false;
    })
  }

  onVideoSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('video').setValue(file);
    }
  }

  onPosterSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('poster').setValue(file);
    }
  }

  onSubmit() {

    if (this.uploadForm.invalid) {
      this.snack.open('Required fieds can\'t be left empty', "Dismiss", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('video', this.uploadForm.get('video').value);
    formData.append('poster', this.uploadForm.get('poster').value);
    formData.append('title', this.uploadForm.get('title').value);
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('category', this.uploadForm.get('category').value);
    formData.append('tags', this.uploadForm.get('tags').value);
    formData.append('language', this.uploadForm.get('language').value);
    formData.append('privacy', this.uploadForm.get('privacy').value);

    this.videoService.createVideo(formData).subscribe(res => {
      this.snack.open("Video created succesfully!", "Dismiss", { duration: 3000 });
    }, err => {
      this.snack.open(err?.error?.message, "Dismiss", { duration: 3000 });
      console.error('Video upload failed \n', err.error?.message);
    });
  }

  onReset() {
    this.uploadForm.reset()
  }


}
