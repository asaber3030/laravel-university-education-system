<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'icon', 'info'];

  public function professors() {
    return $this->hasMany(Professor::class, 'department', 'id');
  }
  public function students() {
    return $this->hasMany(Student::class, 'department', 'id');
  }
  public function years() {
    return $this->hasMany(YearsCourses::class, 'department', 'id');
  }
  public function subjects() {
    return $this->hasMany(Subjects::class, 'department', 'id');
  }

  public static function createDepartment($title, $icon, $info) {
    $fileName = generateFileName() . $icon->getClientOriginalExtension();
    $target = DEPARTMENT_ICON;
    $icon->move($target, $fileName);

    return self::create([
      'title' => $title,
      'icon' => $target . $fileName,
      'info' => $info
    ]);

  }
  public static function updateDepartment($department, $title, $info, $icon, $hasFile) {
    $wholeFileName = $department->icon;
    if ($hasFile) {
      unlink(public_path() . '/' . $wholeFileName);
      $fileName = generateFileName() . $icon->getClientOriginalExtension();
      $target = DEPARTMENT_ICON;
      $wholeFileName = DEPARTMENT_ICON . $fileName;
      $icon->move($target, $fileName);
    }

    return self::where('id', $department->id)->update([
      'title' => $title,
      'icon' => $wholeFileName,
      'info' => $info
    ]);
  }

}
