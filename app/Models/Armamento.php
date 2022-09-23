<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Armamento extends Model
{
     use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'armamentos';

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
    protected $with = ['armamento_tipo'];


     public function armamento_tipo()
    {
        return $this->belongsTo(ArmamentoTipo::class);
    }
}
