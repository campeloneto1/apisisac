<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscalaDispensa extends Model
{
    use HasFactory;

    use HasFactory;

      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'escalas_dispensas';

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
    protected $with = ['escala', 'usuario'];        

    public function escala()
    {
        return $this->belongsTo(Escala::class);
    } 

    public function usuario()
    {
        return $this->belongsTo(User::class);
    } 
}
