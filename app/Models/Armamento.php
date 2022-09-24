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
    protected $with = ['armamento_tipo', 'marca', 'modelo', 'usuarios'];


     public function armamento_tipo()
    {
        return $this->belongsTo(ArmamentoTipo::class);
    }

     public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

     public function modelo()
    {
        return $this->belongsTo(Modelo::class);
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'users_armamentos')->withPivot('id','danificado', 'extraviado','data_emp','data_dev', 'quant', 'observacoes');
        //return $this->hasMany(EscalaUser::class, 'escala_id');
    }
}
