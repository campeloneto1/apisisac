<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posto extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'postos';

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
    protected $with = ['subunidade', 'turnos'];

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

     public function turnos()
    {
        return $this->belongsToMany(Turno::class, 'postos_turnos')->withPivot('id');
        //return $this->hasMany(PostoTurno::class, 'posto_id');
    }
}
