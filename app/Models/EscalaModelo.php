<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalaModelo extends Model
{
    use HasFactory;

      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'escalas_modelos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

     /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['modalidades'];        

    public function modalidades()
    {
        return $this->belongsToMany(Modalidade::class, 'escalas_modalidades')->withPivot('id', 'visivel');
        //return $this->hasMany(EscalaModalidade::class, 'escala_modelo_id');
    }
}
