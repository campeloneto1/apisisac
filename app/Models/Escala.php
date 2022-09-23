<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Escala extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'escalas';

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
    protected $with = ['subunidade', 'escala_modelo'];


     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function escala_modelo()
    {
        return $this->belongsTo(EscalaModelo::class);
    }    

    public function ocorrencias()
    {
        //return $this->belongsToMany(Ocorrencia::class, 'escalas_ocorrencias');
        return $this->hasMany(EscalaOcorrencia::class, 'escala_id');
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'escalas_users', 'escala_id', 'user_id')->withPivot('id','escala_id', 'modalidade_id','posto_id','turno_id', 'atrasado', 'ausente', 'atestado');
        //return $this->hasMany(EscalaUser::class, 'escala_id');
    }
}
